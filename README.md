# Reddit clone made with MEAN stack
_by Gary Pang, "CodeWritingCow"_

This is a Reddit/Hacker News clone made with the MEAN stack.

Although the app is based on a Thinkster.io [tutorial](https://thinkster.io/mean-stack-tutorial), I made major changes.

In the tutorial, angularApp.js contained too many components. So, I removed all its AngularJS states, controllers and factories, then saved them as their own files. I saved configuration variables in a new file (config.js) where I can configure app settings.

Gulp was added to automate parts of my workflow. I installed local packages via Bower, so I could keep working even when the free WiFi was down at my local coffee shop.

The Thinkster tutorial is "Learn to Build Modern Web Apps with MEAN."