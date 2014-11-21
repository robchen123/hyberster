/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.showList();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        $('#btnScan').click(this.showScanner);
    },
    // Update DOM on a Received Event
    showScanner: function() {
        console.log(123);
        cordova.plugins.barcodeScanner.scan(function(result){
            app.openUrl(result.text);
        }, function(error){
            
        });
        return false;
    },
    openUrl: function(url){
        var list = JSON.parse(localStorage.list || '[]');
        if(list.length > 20){
            list.pop();    
        }
        list.unshift(url);
        localStorage.list = JSON.stringify(list);
        location.href = url;
    },
    showList: function(){
        var list = JSON.parse(localStorage.list || '[]');
        if(list.length > 0){
            var out = [];
            $.each(list, function(_, o){
                out.push('<li><a href="' + o + '" style="font-size:0.6rem">' + o + '</a></li>');
            });
            $('#list').html(out.join(''));
        }
    }
};

app.initialize();