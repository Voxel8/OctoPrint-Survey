# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin


class IssuesPlugin(octoprint.plugin.EventHandlerPlugin, octoprint.plugin.AssetPlugin):

    def get_update_information(self, *args, **kwargs):
        return dict(
            alignment_plugin=dict(
                type="github_commit",
                user="Voxel8",
                repo="OctoPrint-Issues",
                branch='master',
                pip="https://github.com/Voxel8/OctoPrint-Issues/archive/{target_version}.zip",
            )
        )

    def get_assets(self):
         return {
             "js": ["js/issues.js"],
             #"css": ["css/navbartemp.css"],
             #"less": ["less/navbartemp.less"]
         }


def __plugin_load__():
    global __plugin_hooks__
    global __plugin_implementation__

    plugin = IssuesPlugin()

    __plugin_implementation__ = plugin
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": plugin.get_update_information,
    }
