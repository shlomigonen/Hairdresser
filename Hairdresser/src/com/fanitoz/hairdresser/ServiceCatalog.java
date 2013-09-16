package com.fanitoz.hairdresser;

import java.util.Iterator;
import java.util.List;
import java.util.Locale;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@Path("/ServiceCatalog")
public class ServiceCatalog {
	// Logger (SLF4J)
	final Logger logger = LoggerFactory.getLogger(getClass());
	// Hibernate
	private static SessionFactory sessionFactory = null;
	private static ServiceRegistry serviceRegistry = null;
	// Spring Message Source
	private ApplicationContext context = null;

	public ServiceCatalog() {
		super();
			
		context = new ClassPathXmlApplicationContext(new String[] {"com/fanitoz/hairdresser/resources/locale.xml"/*, add more spring files here*/});

		if (serviceRegistry == null && sessionFactory == null) {
			try {
				Configuration configuration = new Configuration();
				configuration.configure();
				serviceRegistry = new ServiceRegistryBuilder().applySettings(
						configuration.getProperties()).buildServiceRegistry();
				sessionFactory = configuration
						.buildSessionFactory(serviceRegistry);
				
				logger.info(context.getMessage("db.connection.succesful", null, new Locale("iw", "il")));
				logger.info(context.getMessage("db.connection.succesful", null, Locale.US));
				
			} catch (Throwable ex) {
				logger.error(context.getMessage("session.factory.failure", new Object[] {ex}, null));
				throw new ExceptionInInitializerError(ex);
			}
		}
	}

	@GET
	@Path("/getServices")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Service> getServices() {
		
		logger.info(context.getMessage("get.services", null, Locale.US));
		
		return getServicesFromDB();
	}

	@POST
	@Path("/addService")
	@Consumes(MediaType.APPLICATION_JSON)
	public Integer addService(Service service) {
		
		logger.info(context.getMessage("add.service", null, Locale.US));
		
		Session session = sessionFactory.openSession();
		Transaction tx = null;
		int serviceId = 0;

		try {
			tx = session.beginTransaction();
			serviceId = (Integer) session.save(service);
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}

		return serviceId;
	}
	
	@POST
	@Path("/deleteService")
	@Consumes(MediaType.APPLICATION_JSON)
	public Boolean deleteService(Service service) {

		logger.info(context.getMessage("delete.service", null, Locale.US));
		
		Session session = sessionFactory.openSession();
		Transaction tx = null;
		Boolean result = true;

		try {
			tx = session.beginTransaction();
			session.delete(service);
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
			result = false;
		} finally {
			session.close();
		}
		
		return result;
	}
	
	@POST
	@Path("/updateService")
	@Consumes(MediaType.APPLICATION_JSON)
	public Boolean updateService(Service service) {
		
		logger.info(context.getMessage("update.service", null, Locale.US));

		Session session = sessionFactory.openSession();
		Transaction tx = null;
		Boolean result = true;

		try {
			tx = session.beginTransaction();
			session.update(service);
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
			result = false;
		} finally {
			session.close();
		}
		
		return result;
	}

	@POST
	@Path("/dispatcher")
	@Consumes(MediaType.APPLICATION_JSON)
	public JSONObject dispatcher(JSONObject jsonObj) {

		String request = null;
		JSONObject jsonResult = null;

		try {
			request = jsonObj.getString("request");
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		if (request != null) {
			if (request.equals("getServices"))
				jsonResult = getServicesInJSON();
		}

		return jsonResult;
	}

	private JSONObject getServicesInJSON() {

		JSONObject jsonReturn = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = null;
		List<Service> services = getServicesFromDB();

		Iterator<Service> i = services.iterator();

		while (i.hasNext()) {

			Service service = i.next();

			try {
				jsonObject = new JSONObject("{category='"
						+ service.getCategory() + "', name='"
						+ service.getName() + "', price='" + service.getPrice()
						+ "'}");
				jsonArray.put(jsonObject);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		try {
			jsonReturn.put("priceList", jsonArray);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return jsonReturn;
	}

	private List<Service> getServicesFromDB() {

		List<Service> services = null;

		Session session = sessionFactory.openSession();
		Transaction tx = null;

		try {
			tx = session.beginTransaction();

			services = session.createQuery("FROM Service").list();

			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}

		return services;
	}
}
