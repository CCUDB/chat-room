#!/usr/bin/env python3

import sys
from faker import Factory
import pprint
import json
import random

data_amount = int(sys.argv[1]) if len(sys.argv)>1 else 10
filename = sys.argv[2] if len(sys.argv)>2 else 'test.txt'

f = Factory.create('en_US')
data = []
for i in range(0, data_amount):
    data.append(''.join(random.choice('abcdefghijklmnopqrstuvwxyz') for _ in range(10)))

src = open(filename, 'w', encoding='UTF-8')
src.write(json.dumps(data))
src.close()
