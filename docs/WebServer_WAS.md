# Web Server, WAS

## Web Server

정적 파일 담당  
클라이언트로부터 HTTP 요청을 받아 응답

## Web Container

동적 파일 담당

## WAS (Web Application Sever)

Web Server + Web Container  
HTML과 같은 정적 파일과 더불어 비즈니스 로직, DB 조회와 같은 동적 컨텐츠 제공

## WAS의 요청-응답 처리 과정

![스크린샷 2020-11-29 오후 10 29 01](https://user-images.githubusercontent.com/45786387/100543241-4a69e500-3292-11eb-8384-c79eec97e3b9.png)

요청마다 개별 스레드 생성  
-> 필터를 거친 요청   
-> Dispatcher servlet  
-> HandlerMapping에서 컨트롤러 찾음  
-> HandlerAdapter에서 컨트롤러로 전달  
-> (인터셉터 있다면 경유)
-> Controller에서 요청 처리  
-> 처리된 응답 반환

## 왜 WebServer + WAS를 쓰는가?

정적 파일과 동적 파일을 담당하는 부분을 나눠 **서버 부하 분산(리스크 분산)**

- tomcat 5.5 이상부터는 성능 차이 크게 없음. WAS만으로 충분

물리적 보안⬆️ 

- DB에 접근할 수 있는 WAS에 도달하기 전에 WebServer를 거쳐야 함

WAS를 여러 대 사용 가능

- Load Balancing, Fail over & back
- 무중단 운영을 위한 장애 극복에 쉽게 대응 가능
- 다른 종류의 WAS 서비스 가능 - 수요에 따라 Java, PHP 서버 기반 언어 선택 가능