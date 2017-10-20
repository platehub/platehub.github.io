---
layout: docs
title: Plate Theme tool
page_url: /docs/theme-tool
menu_item: true
id: "theme-tool"
order: 7
---
### How does it work?
The Plate Theme Tool starts up a listener for your theme's folder, and tracks changes. When a file is changed (added, edited, deleted), the theme tool uploads the change immediately to Plate's servers. This way you don't have to worry about FTP'ing your files after each change, but you can edit your theme or site's theme files on the fly.

### Download
<a href="https://bit.ly/plate-theme-tool-mac" class="btn btn-primary btn-lg"><i class="fa fa-fw fa-apple"></i> Download for Mac</a>
<a href="" class="btn btn-primary btn-lg"><i class="fa fa-fw fa-windows"></i> Download for Windows</a>

Or Linux users, [download the JAR file](https://bit.ly/plate-theme-tool-jar), which works on every OS with Java installed.

### How to use
- [Download the Plate Theme Tool](#download) for your OS (Windows, Mac).
- Install and open it.  
![Theme tool](/assets/img/theme-tool-1.png)
- If this is the first time you're working with the theme tool, click on 'Plate' in the menu bar, and next on 'API settings'.
- Fill in your API key and click 'Verify'. You can find your API credentials in your [User settings](https://www.startwithplate.com/dashboard/users/edit) in the Plate dashboard.  
![Theme tool](/assets/img/theme-tool-2.png)

- If the theme tool does not have a preset for your theme yet, you can add it by clicking on the three-dotted button next to the text field under 'Theme path'.
- Navigate to your Theme's folder, and click 'Open'.
- The Theme tool will ask you to save the theme as a preset. If you click 'Yes', you can select the theme next time by selecting it from the 'Presets' dropdown.
- To start the listener, click 'Auto Update'.  
![Theme tool](/assets/img/theme-tool-3.png)
- You can now change your theme files on the fly.
- If you want to stop the listener, toggle the 'Auto Update' button, or just close the application.
