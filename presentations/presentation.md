class: middle, center

# Event recommender -- Evensi

---

# What is Evensi

Evensi is an events search engine

70 million events worldwide

Our goal is to find interesting IT events from Tampere and to recommend those to users

Users will be faked in our own database since we do not have access to Evensi's user data

---

# API access

API access was granted after a request

We have access to events in Finland

We will most likely only focus on events in Tampere

Events from Helsinki will be included if there are not enough events in Tampere

---

# Finding the right events

Using the API events can be found using coordinates and different API calls

There are multiple parameters besides the parameters, e.g. maximum distance from the location of the coordinates

The query parameters also include tags

All Evensi events have categories and tags - we have found the interesting tags for our system and will only be searching for those events

Events can be searched 10 days into past and 30 days into future

---

# Recommending an events

Our users will have events they have been to

They also might be interested in events of certain category

We same the Evensi event data in our database and search for events similar to those the user has been to or similar to the tags the user is interested in. We also take notice of the distance and the date of the event

The event we think the most relevant for the user gets recommended

---

# Techical stuff

We will create nodejs server what will collect data from evensi api and analyse recommendations for users.

First we don't probably do web interface but only API but will create web interface if we got time for it.

---

# What we have done so far?

- We have access to Evensi api
- We got this presentation done
- We got skeleton of code project done
- We have "plan" for recommending events
- We probably got end of this week Evensi api router done :)
