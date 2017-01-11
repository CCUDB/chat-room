#!/usr/bin/env python

import sys
from faker import Faker
import pprint
import json

data_amount = int(sys.argv[1]) if len(sys.argv)>1 else 10
filename = sys.argv[2] if len(sys.argv)>2 else 'test.txt'

f = Faker()
data = []
for i in range(0, data_amount):
    data.append(f.text())

pprint.pprint(data)

src = open(filename, 'w')
src.write(json.dumps(data))
src.close()
