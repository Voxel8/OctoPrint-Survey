$(function() {
    function IssuesViewModel(parameters) {
        var self = this;

        self.appearance = parameters[0];

        self.onEventPrintFailed = function(payload) {
            var params = self.encodeQueryData({'title': 'PrintFailed'});
            var url = 'https://github.com/Voxel8/DevKit-Issues/issues/new?' + params;
            window.open(url);
        };

        self.onEventPrintDone = function(payload) {
            var params = self.encodeQueryData({'title': 'PrintDone'});
            var url = 'https://github.com/Voxel8/DevKit-Issues/issues/new?' + params;
            window.open(url);
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
