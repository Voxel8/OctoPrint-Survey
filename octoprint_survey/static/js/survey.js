$(function() {
    function IssuesViewModel(parameters) {
        var self = this;

        self.appearance = parameters[0];
        self.profiles = parameters[1];

        self.printUrl = 'https://docs.google.com/forms/d/1blQESehguSvkYH9VAJFku2xKCqJn9UnMRqMWEuwhABE/viewform?embedded=true&';
        self.feedbackUrl = 'https://formcrafts.com/a/15350';

        self.feedbackLink = document.getElementById('feedback');

        self.feedbackLink.onclick = function() {
            $.get('/api/plugin/survey', success=function(data){
                //var loglines = data.loglines;
                //console.log(loglines);
                //var params = self.encodeQueryData({
                //    'entry.1274091219': loglines,
                //});
                $.featherlight({
                    iframe: self.feedbackUrl,// + params,
                    iframeWidth: 600,
                    iframeHeight: 800
                });
            });
        };

        self.onEventPrintFailed = function(payload) {
            var params = self.encodeQueryData({
                'entry.1092334781': payload.file,  //Filename
            });
            $.featherlight({
                iframe: self.printUrl + params,
                iframeWidth: 800,
                iframeHeight: 800
            });
        };

        self.onEventPrintDone = function(payload) {
            var params = self.encodeQueryData({
                'entry.1092334781': payload.filename,  //Filename
            });
            $.featherlight({
                iframe: self.printUrl + params,
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
