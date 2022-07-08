# 트랜잭션

쿼리(단일 혹은 연속)에 대한 작업 단위

## 트랜잭션 성질 - ACID

### 원자성 Atomicity

All or Nothing  
성공하지 못하면 Rollback을 통해 이전 상태로 되돌림

### 일관성 Consistency

처리 결과의 일관성 보장  
DB 테이블의 제약조건, 데이터 형식등을 일관성있게 유지해야함

### 독립성 Isolation

서로 다른 트랜잭션에 대해 간섭할 수 없음  
이는 트랜잭션의 성질 중 가장 느슨한 규칙임  
격리 레벨과 잠금으로 보장할 수 있음  
무조건적인 독립성 보장은 성능 저하의 큰 원인, 교착상태 발생의 원인!

### 지속성 Durability

한 번 반영된 트랜잭션의 결과는 영구히 유지되어야 함  
커밋된 이후에 이전 상태로 되돌리는 것은 새로운 트랜잭션의 결과임 -> 이전 트랜잭션 결과의 지속성 침해가 아님

## 격리 수준 (Isolation Level)

Spring의 Isolation.DEFAULT는 DB 설정에 의존하게 된다.  
MySQL은 Repeatable Read가 기본  
PostgreSQL은 Read Committed

### Read UnCommitted

아무런 제약 조건 없음  
하나의 트랜잭션에서 커밋되지 않은 데이터에 대한 개별 트랜잭션의 접근 허용

일관성 유지 하나도 안됨

### Read Committed

커밋된 데이터에 대해서만 접근 가능  
변경 중인 데이터에 대해 접근 불가능

### Repeatable Read

한번 조회한 데이터에 대해 반복 조회 시 일관성을 유지함  
조회 중인 데이터에 대해 다른 트랜잭션은 수정 불가능

### Serializable

한 트랜잭션이 접근 중인 데이터에 대해 접근 불가능 -> 사실상 비관적 잠금과 동일

![격리수준에 따른 문제](https://user-images.githubusercontent.com/45786387/100245950-f2726c00-2f7b-11eb-8478-8a68785d0301.png)

### Dirty Read

동시 접근에 의해 데이터의 일관성이 보장되지 않음  
기존 트랜잭션이 update를 실행한 후 오류에 의해 rollback했지만 다른 트랜잭션은 update된 데이터를 조회할 수 있음

### Non-Repeatable Read

update를 실행 중인 트랜잭션에 의해 다른 트랜잭션 영역 내에서 같은 데이터의 조회가 시점마다 다르게 읽힐 수 있음

### Phantom Read

기존 트랜잭션이 Insert를 실행하고 다른 트랜잭션이 전체 조회를 할 때, 시점에 따라서 조회 대상이 달라짐  
Non-Repeatable Read는 수정에 대한 오류고, Phantom Read는 트랜잭션 영역 내 삽입에 대한 오류

## 트랜잭션 전파 방식 (Propagation)

트랜잭션 내부에서 새로운 트랜잭션이 발생할 때 어떻게 처리하는가?

![전파방식](https://user-images.githubusercontent.com/45786387/100245965-f605f300-2f7b-11eb-8467-d46941e578b7.png)

## 트랜잭션 메커니즘

![매커니즘](https://user-images.githubusercontent.com/45786387/100245897-e25a8c80-2f7b-11eb-9f6c-a337570c6442.png)

### 정상 상황

쿼리 발생!

데이터 캐시에 요청 -> 데이터 파일에서 가져옴

로그 캐시 -> 로그 파일에 기록

- UnDo 로그 - 변경 전의 값 기록 <- 트랜잭션 롤백을 위한 이전 데이터

- ReDo 로그 - 변경 후의 값 기록

데이터 캐시에 기록

트랜잭션 끝!

### 오류 발생

Rollback -> UnDo로그를 통해 역순으로 원복 

Rollback을 못함 -> ReDo 로그를 통해 일관성 유지 후 UnDo로그 활용

---
참고 

[에이든의 트랜잭션 매커니즘](https://www.youtube.com/watch?v=ImvYNlF_saE&t=12s&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech)

[예지니이서의 트랜잭션](https://www.youtube.com/watch?v=e9PC0sroCzc&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech)