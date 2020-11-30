# N + 1 문제

다수의 엔티티를 조회할 때, 부모 엔티티를 통해 연관관계에 있는 자식 엔티티를 조회할 때 쿼리가 다중으로 발생하는 문제

## 해결방안

### Fetch join (Inner Join)

```java
// in PostRepo.java
@Query("select DISTINCT p from Post p join fetch p.comments")
List<Post> findAllJoinFetch();

// in PostRepoSupport.java (QueryDSL)
public List<Post> findAllWithComments() {
return jpaQueryFactory.selectFrom(post)
		.distinct() // 카테시안 곱 방지
  	.innerJoin(post.comments)
  	.fetchJoin() // 실제 Fetch join 작업
  	.fetch(); // 결과 반환
}

```

### @EntityGraph (Outer Join)

```java
// in PostRepo.java
@EntityGraph(attributePaths = "comments")
@Query("select DISTINCT p from Post p")
List<Post> findAllEntityGraph();
```

## 카테시안 곱 문제

Set을 사용하거나, distinct를 사용하거나

## 2개 이상의 하위 엔티티에 대한 Fetch join

ToOne은 여러개도 가능하지만 ToMany는 한번에 하나의 Fetch join만 가능

**MultipleBagFetchException** 발생!

데이터가 많은 쪽만 Fetch join 적용하고 다른 쪽은 Batch Size를 조절해 해결한다

### Batch Size

```yaml
spring.jpa.properties.hibernate.default_batch_fetch_size=1000
```

부모 엔티티의 개수에 따라 발생하던 쿼리들이 `where post_id in (?,?,?)` 절로 바뀌면서 묶여 나감

Fetch join을 사용할 수 없을 때의 대처법일 뿐이다. 절대로 최선의 최적화는 아니다.

---

[조졸두 포스팅 - N + 1](https://jojoldu.tistory.com/165)

[조졸두 포스팅 - 여러 하위 엔티티 Fetch Join](https://jojoldu.tistory.com/457)

[도란도란 위키](https://github.com/woowacourse-teams/2020-doran-doran/wiki/%EC%97%AC%EB%9F%AC-%EA%B0%9C%EC%9D%98-%EC%BB%AC%EB%A0%89%EC%85%98%EC%9D%84-FetchJoin-%EC%8B%9C-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94)