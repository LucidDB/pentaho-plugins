Steps to configure the kettle job and the Bi-Server:

1) Create the connection with the below properties for kettle (kettle.properties)
	LucidDB/type=javax.sql.DataSource
	LucidDB/driver=org.luciddb.jdbc.LucidDbClientDriver
	LucidDB/url=jdbc:luciddb:http://localhost
	LucidDB/user=sa
	LucidDB/password=

2) Run the job
	The job will populate the data for the following dimensions and fact in the foodmart database with different warehouse labels:
	1) Region
	2) Warehouse
	3) Time_by_day
	4) Store
	5) Inventory_fact_1997

This will create the underlying data-warehouse.

3) Configure the JNDI connection with jndi name :LucidDB (This name is reffered in the xactions) in the enterprise console to connect to the foodmart database in LucidDB. This JNDI connection will be used by the Bi-Server reports/dash-boards.

4) The following folders should be placed in the following path relative to the Bi-Server:
	1) Sample Dashboard Files/dashboards
		path: /biserver/pentaho-solutions/dashboards
		
	2) Sample Dashboard Files/demo_css
		path: /biserver-ee/tomcat/webapps/pentaho-style
		
	3) Sample Dashboard Files/demo-images
		path: /biserver-ee/tomcat/webapps/pentaho-style
		
	4) Sample Dashboard Files/template-dashboard-DEMO.html
		path: /biserver-ee/pentaho-solutions/system/pentaho-cdf

To view the Sales Dashboard using CDF
Start the BIServer and in the User Console, you would see the dashboards folder in the solutions repository. In the dashboard folder, open the Sales cdf to view the sales dashboard 

To view the Sales Dashboard using dashboard designer
under the dashboard folder, open the Sales Dashboard to view the sales dashboard 


