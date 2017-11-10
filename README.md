# Dev events for devs
Recommender system for events for software developers. Helping to find your own groups to migle.

## Development environment

1. nodejs 6.11.1 (at least works)
2. [Serverless Framework](https://serverless.com/framework/docs/getting-started/)
3. [AWS Access keys](https://serverless.com/framework/docs/providers/aws/guide/credentials#creating-aws-access-keys)
4. Editor

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
