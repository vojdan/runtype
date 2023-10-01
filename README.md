Generate TS types at runtime from your JSON objects.

# Usage

```
import { runType } from 'runtype';

const myObject = {
  name: 'Johnny Bravo',
  age: 27,
};

const myType = runType(myObject);
```
