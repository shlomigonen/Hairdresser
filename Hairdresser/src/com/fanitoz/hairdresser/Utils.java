package com.fanitoz.hairdresser;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Enumeration;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.UriInfo;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@Path("/Utils")
public class Utils {
	
	@Context 
	ServletContext context;
	@Context
	UriInfo uriInfo;
	@Context
	Request request;

	
	@GET
	@Path("/getDictionary/{locale}")
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject getDictionary(@PathParam("locale") String locale) {
				
		//logger.info(context.getMessage("get.services", null, Locale.US));
				
		JSONObject jsonResult = new JSONObject();
		String javaLocale = "";
		
		// the locale coming from the browsers are different from the java locales
		switch (locale)	{
			case "en-US":
				javaLocale = "en_US";
				break;
			case "he":
				javaLocale = "iw_IL";
				break;
		}
				
		try {
			File file = new File(context.getRealPath("/WEB-INF/classes/resources/locale/application/messages_" + javaLocale + ".properties"));
			FileInputStream fileInput = new FileInputStream(file);
			Properties properties = new Properties();
			properties.load(new InputStreamReader(fileInput, "UTF-8"));
			fileInput.close();

			Enumeration enuKeys = properties.keys();
			while (enuKeys.hasMoreElements()) {
				String key = (String) enuKeys.nextElement();
				String value = properties.getProperty(key);
				jsonResult.put(key, value);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return jsonResult;
	}

}
