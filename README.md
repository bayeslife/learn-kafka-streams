# Learning Kafka Streams

Kafka Streams are a way to described/program operations on streams of data. It is a way to describe pipelines.
It makes use of functional programming concepts.

## Example1-MerginigStreams

In this example 2 streams are created and separate events are fed into each stream.
A kafkastream 'merge' operation is used to combine both streams into a new combined stream.

```
stream started, as kafka consumer is ready.
stream started, as kafka consumer is ready.

Stream[stream1]	Payload	[stream1 0] //Stream 1 receives content written directly to stream 1
Stream[merge]	Payload	[stream1 0] //Merge stream receives content written originally to stream 1
Stream[stream2]	Payload	[stream2 0] //Stream 2 receives content written directly to stream 2
Stream[merge]	Payload	[stream2 0] //Merge stream receives content written originally to stream 2
Stream[stream1]	Payload	[stream1 1] //....and so on
Stream[merge]	Payload	[stream1 1]
Stream[stream2]	Payload	[stream2 1]
Stream[merge]	Payload	[stream2 1]
Stream[stream1]	Payload	[stream1 2]
Stream[merge]	Payload	[stream1 2]
Stream[stream2]	Payload	[stream2 2]
Stream[merge]	Payload	[stream2 2]
Stream[stream1]	Payload	[stream1 3]
Stream[merge]	Payload	[stream1 3]
Stream[stream2]	Payload	[stream2 3]
Stream[merge]	Payload	[stream2 3]
```


## Example2-FilterStream

In this example one stream sees a set of payload which have incrementing value from 0 to 3.
A filterstream is defined to only contain payloads which have event values.

```
const stream1 = kafkaStreams.getKStream("topic1");
let filteredstream = stream1.filter(x=>{
    return x.value%2===0
})
```

The log show exactly this behaviour
```
stream started, as kafka consumer is ready.
Stream[stream1]	Payload	[stream1 0]
Stream[filter]	Payload	[stream1 0] //Filter stream sees even value
Stream[stream1]	Payload	[stream1 1]
Stream[stream1]	Payload	[stream1 2]
Stream[filter]	Payload	[stream1 2] //Filter stream sees even value
Stream[stream1]	Payload	[stream1 3]
```

