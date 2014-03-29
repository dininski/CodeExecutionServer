xPoint = float(input())
yPoint = float(input())


if (xPoint == 0) and (yPoint == 0):
	print(0)
elif xPoint == 0:
	print(5)
elif yPoint == 0:
	print(6)
elif (xPoint > 0) and (yPoint > 0):
	print(1)
elif (xPoint < 0) and (yPoint > 0):
	print(2)
elif (xPoint < 0) and (yPoint < 0):
	print(3)
elif (xPoint > 0) and (yPoint < 0):
	print(4)


