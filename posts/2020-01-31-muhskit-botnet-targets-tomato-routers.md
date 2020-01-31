---
title: New Muhstik Botnet Attacks Target Tomato Routers
author: Spenser Jones
tags: ['security', 'botnet', 'muhstik']
date: 2020-01-31T09:05-07:00
published: true
---

Muhstik is a malware that originally started as a variant of the QNAPCrypt ransomware in October 2019, and was later outfitted with additional attacks for bruteforcing SSH, Wordpress and Drupal credentials, and a few other tools. Exploited devices will join a botnet that is used to attack other devices and run cryptocurrency mining and DDoS attacks. Most recently, it has been taught to attack publicly accessible Tomato routers.

[Tomato](https://advancedtomato.com/) is an open-source alternative firmware for routers, similar to [DD-WRT](https://dd-wrt.com/), that allows users to replace their router's default firmware with a more powerful and customizable OS. According to Shodan, there are more than 4,600 Tomato [routers](https://www.shodan.io/search?query=www-authenticate%3A+basic+realm%3D%22tomato%22) and [NAS devices](https://www.shodan.io/search?query=www-authenticate%3A+basic+realm%3D%22tomatousb%22) that are exposed on the internet, many of which may be using the default Tomato credentials of "admin:admin" and "admin:root"

## Additional Reading

* https://unit42.paloaltonetworks.com/muhstik-botnet-attacks-tomato-routers-to-harvest-new-iot-devices/
