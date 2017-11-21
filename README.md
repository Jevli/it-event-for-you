# Dev events for devs
Recommender system for events for software developers. Helping to find your own groups to migle.

## Development environment

1. Install node
2. Install all depenties
   ```cd web && npm install```
3. Start app:
   - on osx and linux: `DEBUG=web:* npm start`
   - on windows: `set DEBUG=web:* & npm start`

For running in docker-compose (no need to install local database)
1. [Install Docker](https://docs.docker.com/engine/installation/)
2. Run in root folder `docker-compose up --build -d` to start in background
3. (Later will be added auto reload for changed node changes)

For reasons docker-compose doesn't seem to work probelly here is version:
1. First create cassandra container: `docker run --name db -v $PWD/data:/var/lib/cassandra -d cassandra:latest`
2. Build that to Dockerfile project here: `docker build --name app .`
3. Connect cassandra to app: `docker run --link db:cassandra -p 3000:3000 -v $PWD/web/:/usr/src/app app`
`

## Evensi API
https://api.evensi.com/v1.1/docs/

### Evensi event tags
GET https://api.evensi.com/v1.1/category/tag/
- Request params to include locale (en)
- Tags need only be saved once (and if they change)
- Potentially interesting tags:
	- Category id: 2 Culture
		- Tag:
			 - id: 66 Education
	- Category id: 4 Fairs
		- Tag:
			- id: 17 Business
			- id: 69 Conventions
			- id: 20 Courses
			- id: 13 Expos
			- id: 117 Start Up
			- id: 105 Technology
			- id: 70 Workshop

### Evensi events
Event queries can be done up to 30 days to future

Event query fields that can be included in the results (Only a subset listed here):
- Name of the event
- Name of the event, normalized if it's full caps
- Brief event description
- Description of the event
- Start date (datetime)
- End date (datetime)
- If the event is the whole day (boolean)
- Event's location
- Id of an Evensi category
- Name of the Evensi category
- Event tags. (array of integer)
- Event tags. (array of string)
- link of event's page

Queries use longitude and latitude and a distance measure from the specified point.

E.g. Tampere (61.498049, 23.761952) and Helsinki (60.168435, 24.935919)

Tampere hasn't got a lot of events, hence including events from Helsinki might be necessary

Problem is to separate "IT events" from other events just by tags and/or name.

#### Map query
GET https://api.evensi.com/v1.1/event/map/
- Request params fields to include and a list of tags
- Not many events include tags?
- If included, are integer coded

#### Ranked query
GET https://api.evensi.com/v1.1/event/ranked/
- Request params fields to include and a list of tags

#### Event details
GET https://api.evensi.com/v1.1/event/231172095
- Not all events have a lot of info

#### Misc.
- Fetch events with map or ranked query
- Fetch details and save **relevant** events to local or cloud database
- When to recommend an event? What event to recommend?

## Users and events database
- Fake users
	- Save favourite categories and tags
	- Save events, the user has "been to", use ID
	- Save user's location
		- City?
		- Longitude and latitude?
		- Combination of the two?
		- The evensi api returns JSON with location info having both the city and the coordinates
		- Handling might be more straightforward with just the name?
- Events should be checked from evensi api daily (?), every few days (?)
	- Saved to database in JSON
	- Updated events?

### Saving the events
Possibly use for example moment.js for easier handling of dates?

Use map query (https://api.evensi.com/v1.1/event/map/)

Parameters:

{

	date: 2017-11-14

	lat: 61.498195

	lng: 23.761781

	distance: (5 / 10 / 15 / ?)

	tag: 66,17,69,20,13,117,105,70

	token: []

	fields: name,normalized_name,short_description,description,start_date,end_date,full_day,location,category,category_name,tag,tag_name,updated_time,url

}

These coordinates are for Keskustori in Tampere

## Recommending an events

If user has been to an event with tag T, recommend future events with same tag T.

If user has not been to any events, recommend popular events among fake users (??). Or recommend the next upcoming IT event?

Should recommended events be close to the current date? If, for example, there are multiple events with suitable tags? Or recommend multiple events?

Should fake users also have some ratings for events???
[Conversation continues](https://github.com/Jevli/it-event-for-you/issues/5)
