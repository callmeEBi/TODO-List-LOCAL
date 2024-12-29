x = 1382
reversed_num = 0


def revert(num):
    while num != 0:
        temp = num % 10
        global reversed_num
        reversed_num = (reversed_num * 10) + temp
        num //= 10
    return reversed_num


y = revert(x)

sub = list(str(abs(y - x) - 5))

sum = 0
for i in sub:
    sum += int(i)


print(sum)
