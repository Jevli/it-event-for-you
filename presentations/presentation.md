class: middle, center

# Event recommender -- Evensi

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

# Dian vaihto tapahtuu

kirjoittamalla kolme kertaa '-' tämän jälkeen

ja ajaminen tapahtuu:

Find out python version: `python --version`

If Python 2.x:
`python -m SimpleHTTPServer 8000`

If Python 3.x:
`python -m http.server`

---
