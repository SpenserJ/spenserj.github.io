---
title: 250 Million Microsoft Customer Support Records Exposed Online
author: Spenser Jones
tags: ['security', 'data breach', 'microsoft']
date: 2020-01-31T08:44-07:00
published: true
---
On December 5th, 2019, more than 250 million customer support services records dating back to 2005 were exposed due to misconfigured access controls for five Elasticsearch databases. [Bob Diachenko](https://twitter.com/mayhemdayone) discovered these exposed systems on December 29th, 2019 and immediately notified Microsoft, who promptly secured the servers and began an investigation.

Microsoft disclosed some additional details on January 21st, 2020 about the exposure. Automated tools had been used to redact personal information before it was saved in Elasticsearch, however Bob noted that in some cases this data was still partially available, including email addresses, IP addresses, locations, descriptions of claims and cases, case numbers, resolutions, remarks, and internal notes marked "confidential".

## Additional Reading

* https://thehackernews.com/2020/01/microsoft-customer-support.html
* https://threatpost.com/microsoft-250m-customer-service-records-open/152086/
* https://nakedsecurity.sophos.com/2020/01/22/big-microsoft-data-breach-250-million-records-exposed/
* https://msrc-blog.microsoft.com/2020/01/22/access-misconfiguration-for-customer-support-database/
