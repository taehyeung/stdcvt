# 장비 위치

장비위치는 devloc_t 로 표현된다. 장비위치코드는 조금 복잡할 수 있다. 장비위치는 농장구역에 대한 구분값과 장비가 작동하는 대상의 조합으로 생성된다.


농장 구역에 대한 구분값으로 농장 외부는 항상 0이며, 농장 내부는 0보다 큰값이 된다. 이 값은 농장을 x, y, z로 나눈 영역을 기반으로 한다. 각각을 1로 하는 경우 농장 전체가 하나의 영역(1 x 1 x 1)이 된다. 각각을 3 등분하는 경우 농장을 27등분으로 나누는 것이 된다(ex. cubic).


실제로는 최소 구분으로 높이를 3등분하는 것을 추천한다. 높이를 지하부, 지상부(작물주변), 지상부(작물높이이상)의 3단계로 구분하고, 폭과 길이를 각각 1로 하는 것이 최소구역구분이다.  온실을 예로 설명하면 일반적인 단동온실의 경우 센서를 하나만 설치하는 경우가 일반적이기 때문에 온실내부를 최소 구분단위보다 세분하는 것이 의미가 없다. 

이 경우 외부기상대는 구역구분값이 0, 온실내부 온도센서는 작물주변의 온도를 측정해야 하기때문에 구역구분값을 2로 한다. 

![greenhouse1](../images/device_location_1.gif)

단동온실을 폭, 길이, 높이를 모두 3 구역으로 나눈다면 총 27 구역이 된다. 이때 구역구분값은 다음과 같이 처리된다.

![greenhouse2](../images/device_location_2.gif)

번호는 북쪽에 가까운 폭방향의 왼쪽부터 순차적으로 주어진다. 위 예에서는 왼쪽 아래방향이 북쪽방향에 해당한다.
**(구역 번호를 결정하는 순서에 대해서 고민할 필요가 있다. 농장의 방향에 따라 번호순서를 결정?)**

실제적으로 단동온실을 여러구역으로 나누는 경우는 거의 없을 것이다. 연동 온실의 경우 몇개의 센서를 두고 관리하는 경우가 있는데, 이 경우 센서로 구분하고 싶은 구역에 따라서 x, y, z 값을 선정할 수 있다. 3연동 온실에 동별로 센서를 설치한다면 x, y, z 값으로 3, 1, 3을 설정할 수 있을 것이다.


장비가 작동하는 대상번호는 다음과 같다.

| 번호 | 대상 | 설명 |
|:--------:|:--------:|:--------|
| 01 | 설비 | 설비를 대상으로 하는 경우 ex. 창, 팬 |
| 02 | 대기 | 대기를 대상으로 하는 경우 ex. 온도, 습도 |
| 03 | 토양 | 토양을 대상으로 하는 경우 ex. 지온, 지습, EC | 
| 04 | 양액 | 양액을 대상으로 하는 경우 ex. EC, pH | 
| 05 | 작물(줄기) | 작물의 줄기를 대상으로 하는 경우 | 
| 06 | 작물(잎) | 작물의 잎을 대상으로하는 경우 |
| 07 | 작물(과실) | 작물의 과실을 대상으로 하는 경우 | 
| 08 | 작물(뿌리) | 작물의 뿌리를 대상으로 하는 경우 |
| 09 | 북측설비 | 북쪽을 기준으로 시계방향으로 봤을때 가까운 설비를 대상으로 하는 경우 ex. 우측창 |
| 10 | 남측설비 | 북쪽을 기준으로 시계방향으로 봤을때 먼 설비를 대상으로 하는 경우 ex. 좌측창 |


**(구동기에 대한 특이사항을 정리할 방안이 필요할 수 있다. 예를 들어 3중창같은 경우!!)**


장비 위치는 long int 타입으로 총 14자리 정수를 사용한다. 자리수는 다음과 같다.

| X(폭) | Y(길이) | Z(높이) | 위치번호 | 대상번호 |
|:--------:|:--------:|:--------:|:--------:|:--------:|
| 2 | 2 | 2 | 6 | 2|

다음은 단동온실의 예시이다.

1. 단동온실 내부구역을 구분하지 않아 최소구역단위를 사용한다. (X : 1, Y : 1, Z : 3)
1. 단동온실에 내부기온 측정용 센서가 있다. (위치번호 : 010102, 대상번호 02)
1. 단동온실 외부에 외부기온 측정용 센서가 있다. (위치번호 : 000000, 대상번호 02)
1. 단동온실에 측창이 있다. (위치번호 : 010102, 대상번호 01)
1. 단동온실에 천창이 있다. (위치번호 : 010103, 대상번호 01)

| X(폭) | Y(길이) | Z(높이) | 위치번호 | 대상번호 | **장비위치코드** | 비고 | 
|--------:|--------:|--------:|--------:|--------:|--------:|:--------|
| 01 | 01 | 03 | 010102 | 02 | **01010301010202** | 내부기온센서위치 |
| 01 | 01 | 03 | 000000 | 02 | **01010300000002** | 외부기온센서위치 |
| 01 | 01 | 03 | 010102 | 01 | **01010301010201** | 측창위치 |
| 01 | 01 | 03 | 010103 | 01 | **01010301010301** | 천창위치 |


```
typedef long devloc_t;
```