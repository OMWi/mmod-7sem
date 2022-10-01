import random


def generate_1(
    amount: int, 
    probability: float
    ) -> list[bool]:
    res = []
    for _ in range(amount):
        if random.random() <= probability:
            res.append(True)
        else:
            res.append(False)
    return res

def generate_2(
    amount: int, 
    probabilities: list[float]
    ) -> list[bool]:
    res = []
    for i in range(amount):
        if random.random() <= probabilities[i]:
            res.append(True)
        else:
            res.append(False)
    return res

def generate_3(
    amount: int, 
    probability: float, 
    conditional_probability:float
    ) -> int:
    if random.random() <= probability:
        if random.random() <= conditional_probability:
            return 0
        else:
            return 1        
    else:
        if random.random() <= 1 - conditional_probability:
            return 2
        else:
            return 3


# what's the difference from 2nd generator?
def generate_4(
    amount: int,
    probabilities: list[float]
    ) -> int:
    rand = random.random()
    right_border = 0
    for i, prob in enumerate(probabilities):
        right_border += prob
        if rand <= right_border:
            return i


        


if __name__ == '__main__':
    amount = 1_000_000
    list1 = generate_1(amount, 1/2)
    list2 = generate_2(5, [1/2, 1/3, 1/4, 1/5, 1/10])
    # true_results = [0, 0, 0, 0, 0]
    # for _ in range(amount):
    #     list2 = generate_2(5, [1/2, 1/3, 1/4, 1/5, 1/10])
    #     for i, elem in enumerate(list2):
    #         if elem:
    #             true_results[i] += 1
    # print([elem/amount for elem in true_results])


