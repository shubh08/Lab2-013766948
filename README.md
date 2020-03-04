# Lab2-013766948
Lab2 Project -- # Grubhub Prototype
This project is created as part of the individual project assignment of CMPE-273 class.
It is a fully functional prototype of popular online food ordering application GRUBHUB . It has 2 separate modules for customer and restaurant owner each.

The customer has to first sign up and then login to access the application. The password is stored securely using the hashing feature provided by the Bcrypt npm package. A customer can update his/her profile information (updating name, address, phone number and uploading his/her image.).
On the customer's homepage, there is one search section, using which users can search for his/her favorite foods online and order from the restaurant offering those food items. The customer can also track the status of the order using a separate tracking page.

Restaurant Owner also has to first signup and then log in to access the application. He/she can update profile and restaurant information, create/update/delete food sections and add menu items to those sections along with the food images. He/she can also track the orders posted by the customers for his restaurant and update the status as per the availability of the items. Kafka message queues are implemented to improve scalability and chat feature for both customer and restaurant owner is also integrated with the system.
