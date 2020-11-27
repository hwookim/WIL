# Index

목차, 찾기 쉽게 해주는 키를 모은 **별도의 자료구조**  
자주 사용되는 테이블에 대한 DB조회 시 디스크에 직접 조회하지 않고 메모리 상에 **바로가기**를 만들어 빠르게 찾을 수 있도록 함  
범위 조회 시 성능 향상  
조회 이외(삽입, 삭제, 수정)에는 일부 성능 저하 있음 -> 무조건적인 인덱싱은 좋지 않을 수 있다.

### Cardinality

농도, 밀도  
인덱스의 유효도 (성별 ⬇, 주민번호 ⬆)

** cluster - 군집화

## Clustered Index

![스크린샷 2020-11-27 오전 11 26 57](https://user-images.githubusercontent.com/45786387/100403919-770bda00-30a3-11eb-9fb9-939b2eb0be1a.png)

군집화된 인덱스, 정렬된 인덱스  
특정 값, 범위 검색에 강력하지만 삽입 시에 어려움  
한 테이블에 하나  
InnoDB의 PK는 항상 clustered index

## Non-Clustered Index

![스크린샷 2020-11-27 오전 11 26 13](https://user-images.githubusercontent.com/45786387/100403882-5e032900-30a3-11eb-89eb-f491378ce6f3.png)

간접 참조, 정렬되지 않은 인덱스, 해쉬테이블  
한 테이블에 여러개가 생길 수 있음

**B-Tree 구조**를 가짐

### B-Tree 구조

![스크린샷 2020-11-27 오전 11 19 50](https://user-images.githubusercontent.com/45786387/100403527-7c1c5980-30a2-11eb-8b10-7fe3210d0649.png)

---

[안돌의 INDEX](https://www.youtube.com/watch?v=NkZ6r6z2pBg&list=PLgXGHBqgT2TvpJ_p9L_yZKPifgdBOzdVH&index=77&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech)

[레베카의 인덱스](https://www.youtube.com/watch?v=9ZXIoh9PtwY&list=PLgXGHBqgT2TvpJ_p9L_yZKPifgdBOzdVH&index=24&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech)

[올라프의 Clustered vs Non-Clustered Indx](https://www.youtube.com/watch?v=js4y5VDknfA&list=PLgXGHBqgT2TvpJ_p9L_yZKPifgdBOzdVH&index=56&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech)