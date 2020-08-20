<html>
    <head>
        <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
        <script src="https://code.highcharts.com/stock/highstock.js"></script>
        <script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
    </head>
    <body>
        <a href="/">홈</a>
        <div id="container" style="height: 400px; min-width: 510px"></div>
        <script>
            function draw3(){
                var chartdata = [];
                var volumndata= [];
                $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_ETH&start=1455699200&end=9999999999&period=14400', function (data) {
                    $.each(data, function(i, item){
                        chartdata.push([item.date*1000, item.open, item.high, item.low, item.close]);
                        volumndata.push([item.date*1000,item.volume]);
                    });
                }).done(function(){
                    Highcharts.stockChart('container',{
                       yAxis: [{
                           labels: {
                               align: 'left'
                           },
                           height: '80%',
                           resize: {
                               enabled: true
                           }
                       }, {
                           labels: {
                               align: 'left'
                           },
                           top: '80%',
                           height: '20%',
                           offset: 0
                       }],
                       series: [{
                           type: 'candlestick',
                           id: 'aapl-ohlc',
                           name: 'AAPL Stock Price',
                           data: chartdata
                       }, {
                           type: 'column',
                           id: 'aapl-volume',
                           name: 'AAPL Volume',
                           data: volumndata,
                           yAxis: 1
                       }]
                    });
                });
            }
            draw3();
        </script>
    </body>
</html>
