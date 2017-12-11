class: middle, center

# Event recommender -- Evensi

---

# Team

- Joni Laurila
- Marja Ahonen

---

# Technology

We did use nodejs server, momentjs library for datetime handling, Evensi API for getting events, mysql database for our data storage.

---
class: center
# Architecture

![kuva](./architecture.png)

---

# Solution

1. First we collect information from from Evensi API and analyze it. We search for specific keywords for finding IT events.

2. Then we make recommendations from that data based of number of keywords found in data.

---

# Recommending

1. All future events were fetched from the database.

2. These events were processed and the keyword count of each event was calculated.

3. The max amounts of keywords existing in the events was calculated

4. The events with the largest keyword counts were collected and then the three first ones returned to the user

---

# Results (and stuff to improve)

- Even with only a couple of dozens events, the recommendation logic worked well

- More problematic part was finding the keywords

- With a more finely tuned keyword search algorithm the results would be more meaningful

- Daily Evensi quota for the API calls was really small and we maxed it out several times

- It slowed our working since we were unable to get all the data when we needed it

- Also, saving all events proved problematic, for example, because of Cyrillic alphabet in the names and descriptions

---

class: center
# Thank you!
