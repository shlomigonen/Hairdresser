package com.fanitoz.hairdresser;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

public class CreateServices {

	private static SessionFactory sessionFactory;
	private static ServiceRegistry serviceRegistry;
	
	public static void main(String[] args) {
		try{
			Configuration configuration = new Configuration();
			configuration.configure();
			serviceRegistry = new ServiceRegistryBuilder().applySettings(configuration.getProperties()).buildServiceRegistry();        
			sessionFactory = configuration.buildSessionFactory(serviceRegistry);
	      }catch (Throwable ex) { 
	         System.err.println("Failed to create sessionFactory object." + ex);
	         throw new ExceptionInInitializerError(ex); 
	      }
		
		CreateServices createSErvices = new CreateServices();
		
		createSErvices.addService("עיצוב שער", "נשים", "החלקה", new Double(100.50));		
		createSErvices.addService("עיצוב שער", "נשים", "סילסול", new Double(100));		
		createSErvices.addService("עיצוב שער", "נשים", "פן", new Double(100));		
		createSErvices.addService("עיצוב שער", "גברים", "רונאלדו", new Double(50.25));	
		createSErvices.addService("עיצוב שער", "ילדים", "מוהיקן", new Double(20));
		createSErvices.addService("טיפול פנים", "פילינג", "פילינג קל", new Double(120.70));
		createSErvices.addService("טיפול פנים", "פילינג", "פילינג בינוני", new Double(120));
		createSErvices.addService("טיפול פנים", "קוסמטיקה", "טיפול לעור יבש", new Double(150));
		createSErvices.addService("טיפול פנים", "קוסמטיקה", "טיפול לאקנה", new Double(150));
		

	}
	
	public Integer addService(String type, String category, String name, Double price){
	      Session session = sessionFactory.openSession();
	      Transaction tx = null;
	      Integer serviceId = null;
	      try{
	         tx = session.beginTransaction();
	         Service service = new Service(type, category, name, price);
	         serviceId = (Integer) session.save(service); 
	         tx.commit();
	      }catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         e.printStackTrace(); 
	      }finally {
	         session.close(); 
	      }
	      return serviceId;
	   }

}
