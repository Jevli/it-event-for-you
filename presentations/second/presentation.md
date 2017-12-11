class: middle, center

# Event recommender -- Evensi

---

# Team

- Joni Laurila
- Marja Ahonen

---

# Evensi data

Database connection was established on Dec 5th

Since then some dozens of events were saved from Evensi

First all events were saved, later we only started to save events that matched one or more keywords

---

# Keywords

We had a list of keywords

Keyword list was constructed by hand, the words were picked up for example from actual Evensi IT events

The list had in total almost a hundred words

Keywords were searched from event name and description

Searching was done with substring matching

---

# Recommendations

Recommendations were calculated by comparing the amount of keywords for an event

Three events with most keywords were recommended

Events could be in Tampere, Helsinki or Turku

---

# How the events were chosen

All future events were fetched from the database

These events were processed and the keyword count of each event was calculated

The amounts of keywords were also calculated

Then the events with the amounts of the three largest keyword counts were selected and after that the three first returned to the user

The results were showed in JSON

---

# Results

Even with only a couple of dozens events, the recommendation worked well (according to our logic)

More problematic part was finding the keywords

With a more finely tuned keyword search algorithm the results would be more meaningful

---

# Problems

Daily Evensi quota for the API calls was really small and we maxed it out several times

It slowed our working since we were unable to get all the data when we needed it

Also, saving all events proved problematic because of Cyrillic alphabets in the names and descriptions

---

# Questions?

---

# Thank you!

---
