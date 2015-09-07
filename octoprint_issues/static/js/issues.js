$(function() {
    function IssuesViewModel(parameters) {
        var self = this;

        self.appearance = parameters[0];
        self.profiles = parameters[1];
        self.url = 'https://github.com/Voxel8/Print-Reporting/issues/new?';

        self.onEventPrintFailed = function(payload) {
            var params = self.encodeQueryData(
                {'title': self.profiles.currentProfile.name + ' PrintFailed: ' + payload.file}
            );
            console.log(self.profiles);
            window.open(self.url + params);
        };

        self.onEventPrintDone = function(payload) {
            var params = self.encodeQueryData(
                {'title': self.profiles.currentProfile.name + ' PrintDone: ' + payload.filename}
            );
            console.log(payload);
            window.open(self.url + params);
        };

        self.encodeQueryData= function(data) {
            var ret = [];
            for (var d in data)
                ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
            return ret.join("&");
        };

    }

    OCTOPRINT_VIEWMODELS.push([
        IssuesViewModel,
        ["appearanceViewModel", "printerProfilesViewModel"],
        ""
    ]);
});
