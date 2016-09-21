# sigh-thru
Modify intermediate results in pipeline

## API
```
thru(hander: (event) => Event | Pomise<Event>)
```

## EXAMPLE
```
pipelines["test"] = [
    glob({ basePath: "src" }, "**/*.ts"),
    thru(event => {
        event.changeFileSuffix("js");
        event.data = `// Modified ${new Date()}\n${event.data}`;
        return event; // Or you can return promise here
    }),
    write("lib")
];
```

## CHANGELOG
* 0.0.1 (21 Sep 2016): first release