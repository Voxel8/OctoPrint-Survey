# coding=utf-8
from __future__ import absolute_import

import flask

import octoprint.plugin


class SurveyPlugin(octoprint.plugin.EventHandlerPlugin,
                   octoprint.plugin.AssetPlugin,
                   octoprint.plugin.TemplatePlugin,
                   octoprint.plugin.SimpleApiPlugin,
                ):

    def get_update_information(self, *args, **kwargs):
        return dict(
            survey_plugin=dict(
                type="github_commit",
                user="Voxel8",
                repo="OctoPrint-Survey",
                branch='master',
                pip="https://github.com/Voxel8/OctoPrint-Survey/archive/{target_version}.zip",
            )
        )

    def get_assets(self):
         return {
             "js": ["js/survey.js", "js/featherlight.min.js"],
             "css": ["css/featherlight.min.css"],
         }

    def loglines(self, length=None):
         with open('/Users/jack/Library/Application Support/OctoPrint/logs/octoprint.log') as logfile:
             lines = logfile.readlines()
             if length is None:
                 return lines
             else:
                 return lines[-length:]

    ### SimpleApiPlugin API ####################################################

    def on_api_get(self, request):
        return flask.jsonify(loglines='\n'.join(self.loglines(30)))


def __plugin_load__():
    global __plugin_hooks__
    global __plugin_implementation__

    plugin = SurveyPlugin()

    __plugin_implementation__ = plugin
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": plugin.get_update_information,
    }
