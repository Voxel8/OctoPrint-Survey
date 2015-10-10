$(function() {
    function IssuesViewModel(parameters) {
        var self = this;

        self.appearance = parameters[0];
        self.profiles = parameters[1];
        self.url = 'https://docs.google.com/a/voxel8.co/forms/d/1kF5Bdiu50WfGmzpM2lSvXbDEZ6_k4ka1wx5i-30XFV8/viewform?embedded=true';

        self.onEventPrintFailed = function(payload) {
            var params = self.encodeQueryData({
                'entry.1137737192': 'PrintFailed',  //Action
                'entry.489248788': payload.file,  //Filename
            });
            $.featherlight({
                iframe: self.url + params,
                iframeWidth: 800,
                iframeHeight: 600
            });
        };

        self.onEventPrintDone = function(payload) {
            var params = self.encodeQueryData({
                'entry.1137737192': 'PrintDone',  //Action
                'entry.489248788': payload.filename,  //Filename
            });
            $.featherlight({
                iframe: self.url + params,
                iframeWidth: 800,
                iframeHeight: 600
            });
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
