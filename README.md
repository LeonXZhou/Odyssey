# Odyssey Project

Odyssey is an outdoor adventure planning app that aims to bridge the gap of expierence between seasoned outdoor veterans and novices. It allows users to plan all aspects of their trip and share these plan with other users. Ultimately Odyssey hopes to make the outdoors more accescible and safer for everyone. 

Odyssey is implemented using the PERN stack. It utilizes React on the frontend. The backend is implemented using Node and Express alongside a PosgresSQL database.

## Features:
### Home Page:
Logged in users are able to create trips within a specified date ranged.
!["Home Page"](https://github.com/LeonXZhou/Odyssey/blob/main/Documentation/Screenshots/HomePages.png)
### My Trips:
Users are able to review and edit their planned trips. 
!["My Trips"](https://github.com/LeonXZhou/Odyssey/blob/main/Documentation/Screenshots/MyTrips.png)
### Planning:
The Planning Section is divided into 5 tabs: General, Route, Equipment, Meals, and Emergency Contact.
#### General:
In the general tab users can update basic information such as the name and dates of their trips. Users can also add a short description and toggle whether their trip is shared publically.
!["General"](https://github.com/LeonXZhou/Odyssey/blob/main/Documentation/Screenshots/GeneralPlanning.png)
#### Route:
The route tab users are able to interact with a map to plan out stops and pacing of their trip by adding in markers. 

Users are able to attach information on each marker such as the date they will be at that location or the purpose of the marker.
!["General"](https://github.com/LeonXZhou/Odyssey/blob/main/Documentation/Screenshots/RoutePlanning.png)

Users are also able to toggle between various helpful themes for the map such as topographical or satellite. 
!["General"](https://github.com/LeonXZhou/Odyssey/blob/main/Documentation/Screenshots/RoutePlanningMapTheme.png)

The map functionality is implemented using React-Leaflet.
#### Equipment:
On the equipment tab users are able to create custom equipement categories and edit the gear they want in each category. The app also provides the user with the weather forecast based on the days of their trip and the location of the markers from the route tab. The weather functionality is implemented using the openweathermap API.
!["General"](https://github.com/LeonXZhou/Odyssey/blob/main/Documentation/Screenshots/EquipmentPlanning.png)
#### Meals:

#### Emergency Contact
### Viewing Other Trips:

## Dependencies

- Express
- Node 16 or above
