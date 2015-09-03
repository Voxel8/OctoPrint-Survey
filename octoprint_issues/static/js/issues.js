$(function() {
    function IssuesViewModel(parameters) {
        var self = this;

        self.appearance = parameters[0];
        self.url = 'https://github.com/Voxel8/DevKit-Issues/issues/new?';

        self.onEventPrintFailed = function(payload) {
            var params = self.encodeQueryData({'title': 'PrintFailed'});
            window.open(self.url + params);
        };

        self.onEventPrintDone = function(payload) {
            var params = self.encodeQueryData({'title': 'PrintDone'});
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
        ["appearanceViewModel"],
        ""
    ]);
});
