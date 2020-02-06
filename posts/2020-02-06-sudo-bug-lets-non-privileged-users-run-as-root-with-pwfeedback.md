---
title: Sudo bug lets non-privileged users run as root if pwfeedback is enabled
author: Spenser Jones
tags: ['security', 'bug', 'vulnerability', 'sudo']
date: 2020-02-06T09:47-07:00
published: true
---
A new vulnerability in Sudo has been discovered, allowing non-privileged users to execute arbitrary commands as 'root' if the environment is configured with `pwfeedback`. This was discovered by Joe Vennix of Apple Information Security, who also discovered a [potential bypass of Runas user restrictions](https://www.sudo.ws/alerts/minus_1_uid.html) in October of 2019, and has been assigned [CVE-2019-18634](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-18634). Most Linux distributions do not have `pwfeedback` enabled by default, however Linux Mint and Elementary OS do, and if enabled it will provide an asterisk (*) as a visual representation of the characters that have been entered, instead of the default of displaying nothing. This bug can be reproduced by passing a large input to sudo via a pipe, causing a buffer overfow and bypassing the authorization check.

This has been fixed in Sudo 1.8.31, as well as in macOS High Sierra 10.13.6, Mojave 10.14.6, Catalina 10.15.2.

## Additional Reading

* https://www.sudo.ws/alerts/pwfeedback.html
* https://support.apple.com/en-in/HT210919
