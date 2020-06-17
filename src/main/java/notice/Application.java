package notice;

import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;
import org.apache.tomcat.util.descriptor.web.ContextResource;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.embedded.tomcat.TomcatWebServer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jndi.JndiObjectFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@MapperScan(value="notice", sqlSessionFactoryRef="sqlSessionFactroy")
@PropertySource(value = { "classpath:application.properties" })
@EnableTransactionManagement 
public class Application {
	
	@Value("${db.datasource.driver-class-name}")
	String dbDriverClassName;
	@Value("${db.datasource.url}") 
	String dbJdbcUrl;
	@Value("${db.datasource.username}") 
	String dbUserName;
	@Value("${db.datasource.password}") 
	String dbPassword;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
	/**
	 * JNDI 설정
	 * @return
	 */
    @Profile("default")
	@Bean
	public TomcatServletWebServerFactory tomcatFactory() {
		return new TomcatServletWebServerFactory() {
    		@Override
    		protected TomcatWebServer getTomcatWebServer(Tomcat tomcat) {
    			tomcat.enableNaming();
    			return super.getTomcatWebServer(tomcat);
    		}

    		@Override
    		protected void postProcessContext(Context context){
    			ContextResource resource = null;
    			try {
    				resource = new ContextResource();
    				resource.setName("jdbc/mydb");
    				resource.setType(DataSource.class.getName());
    				resource.setProperty("driverClassName", dbDriverClassName);
    				resource.setProperty("url", dbJdbcUrl);
    				resource.setProperty("username", dbUserName);
    				resource.setProperty("password", dbPassword);
    				context.getNamingResources().addResource(resource);
    				
    			} catch (Exception e) {
    				e.printStackTrace();
    			}
    		}
    	};
     
    }
	
	@Lazy
	@Autowired
	@Primary
	@Bean(name="dataSource")
	public DataSource dataSource() throws IllegalArgumentException, NamingException {
		JndiObjectFactoryBean bean = new JndiObjectFactoryBean();
		bean.setJndiName("java:comp/env/jdbc/mydb");
		bean.setProxyInterface(DataSource.class);
		bean.setLookupOnStartup(false);
		bean.afterPropertiesSet();
		return (DataSource)bean.getObject();
	}
	
	@Bean(name = "sqlSession", destroyMethod = "clearCache")
	@Autowired
	@Primary
	public SqlSessionTemplate sqlSEssionTemplate(final ApplicationContext applicationContext) throws Exception{
		return new SqlSessionTemplate(this.sqlSessionFactory(applicationContext).getObject());
	}
	
	private SqlSessionFactoryBean sqlSessionFactory(final ApplicationContext applicationContext) throws Exception {
		SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
		sqlSessionFactory.setDataSource(dataSource());
		sqlSessionFactory.setConfigLocation(applicationContext.getResource("classpath:mappers/mybatis-config.xml"));
		sqlSessionFactory.setMapperLocations(applicationContext.getResources("classpath:mappers/*Mapper.xml"));
		return sqlSessionFactory;
	}

}