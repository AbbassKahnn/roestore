# Roehampton eStore

Roehampton estore is an ecommerce web application which is built on the microservices architecture
so in order to run it successfuly please do follow these steps

# for clone the code form git

we will open the terminal and do
```
git clone https://github.com/AbbassKahnn/roestore/
```

## for database 

-> access datadumps and .env file at my share point [here](https://roehamptonprod-my.sharepoint.com/:f:/r/personal/khanm45_roehampton_ac_uk/Documents/database%20dumps%20and%20env%20files%20for%20Roehampton%20eStore?csf=1&web=1&e=nybKQW)

-> import the datadumps at three databases in your databse

-> rename the .env files paste in the following way

  for .env file for order service.env
  go to directory order_cartService and paste it as .env
  
  for .env file for product service.env
  go to directory productService and paste it as .env
  
  for .env file for user service.env
  go to directory userService and paste it as .env
  
 ## for running tha application
 
 -> first lets install all the packages
 so we wil do that by going to each directories and run the commands
 so, first we will go to the terminal and do
 ```
 cd frontend
 ```
 and install the dependencies by command
 ```
 npm i
 ```
 
 then we will open another terminal and do
 ```
 cd order_cartService
 ```
 and install the dependencies by command
 ```
 npm i
 ```
    
 afterwards we will open another terminal and do
 ```
 cd productService
 ```
 and install the dependencies by command
 ```
 npm i
 ```
 
 then we will open another terminal and do
 ```
 cd userService
 ```
 and install the dependencies by command
 ```
 npm i
 ```
 
 
At this point we have opened 4 terminals and each of them has different directories as

-Roe_eStore\frontend>

-Roe_eStore\order_cartService>

-Roe_eStore\productService>

-Roe_eStore\userService>


For frontend directory only we will run command
```
npm start
```



for all three services directories we have to just run following command in each directory
```
npm run dev
```


after all this run successfully application is running in development mode

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

