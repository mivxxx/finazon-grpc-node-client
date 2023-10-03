const { credentials, Metadata } = require('@grpc/grpc-js');
const { FindTickersCryptoRequest } = require('mivxxx-finazon-grpc-node-client/tickers_pb');
const { TickersServiceClient } = require('mivxxx-finazon-grpc-node-client/tickers_grpc_pb');

const HOST ='grpc-latest.finazon.io:443'
const API_KEY = "your_apikey";

const main = async () => {
    if (API_KEY === 'your_apikey') {
        console.error('Please set correct api key into API_KEY variable');
        return;
    }

    console.log('reading tickers crypto...');
    const tickers = await getTickersCrypto('$ADS/ETH');
    console.log(JSON.stringify(tickers.toObject(), null, 2));
};

const getTickersCrypto = async (ticker) => {
    const tickersService = new TickersServiceClient(HOST, credentials.createSsl());

    const request = new FindTickersCryptoRequest();
    if (ticker) {
        request.setTicker(ticker);
    }

    const result = await new Promise((resolve, reject) => {
        tickersService.findTickersCrypto(request, getMetadata(), (err, value) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(value);
        })
    });

    return result;
};

const getMetadata = () => {
    const meta = new Metadata();
    meta.set('authorization', `Bearer ${API_KEY}`);
    return meta;
}

main();
