const {KafkaStreams} = require("kafka-streams");

let config = {
    "noptions": {
        "metadata.broker.list": "localhost:9092",
        "group.id": "kafka-streams-test-native",
        "client.id": "kafka-streams-test-name-native",
        "event_cb": true,
        "compression.codec": "snappy",
        "api.version.request": true,
        "socket.keepalive.enable": true,
        "socket.blocking.max.ms": 100,
        "enable.auto.commit": false,
        "auto.commit.interval.ms": 100,
        "heartbeat.interval.ms": 250,
        "retry.backoff.ms": 250,
        "fetch.min.bytes": 100,
        "fetch.message.max.bytes": 2 * 1024 * 1024,
        "queued.min.messages": 100,
        "fetch.error.backoff.ms": 100,
        "queued.max.messages.kbytes": 50,
        "fetch.wait.max.ms": 1000,
        "queue.buffering.max.ms": 1000,
        "batch.num.messages": 10000
    },
    "tconf": {
        "auto.offset.reset": "earliest",
        "request.required.acks": 1
    },
    "batchOptions": {
        "batchSize": 5,
        "commitEveryNBatch": 1,
        "concurrency": 1,
        "commitSync": false,
        "noBatchCommits": false
    }
}

const kafkaStreams = new KafkaStreams(config);
kafkaStreams.on("error", (error) => console.error(error));

const stream1 = kafkaStreams.getKStream("topic1");

{
    //stream1.forEach(message => console.log(`Stream1 ${message}`));
    surfacestream(stream1,'stream1')   
}
{
    let filteredstream = stream1.filter(x=>{
        return x.value%2===0
    })
    surfacestream(filteredstream,'filter')
}

function surfacestream(stream,streamName){
    stream.forEach(message => console.log(`Stream[${streamName}]\t${message.description}`));
    stream.start().then(() => {
        console.log("stream started, as kafka consumer is ready.");
    }, error => {
        console.log("streamed failed to start: " + error);
    });
}
produceInto(stream1,'stream1')

async function produceInto(stream, streamName){
    let indexes = [...Array(4).keys()]
    for(const i in indexes){
        await new Promise(resolve => setTimeout(() => resolve(), 1000));
        stream.writeToStream({
            value: i, 
            description: `Payload\t[${streamName} ${i}]`});
    }
}