## server start

- npm i
- npm run start(npm run start:dev)

---

- /transactions/retry, **POST**

  - 실패한 트랜잭션 데이터 요청 재시도.

- /transactions/maxRequest/:times, **POST**

  - 1회당 병렬 API 요청수 조절

- /store-transactions/maxRequest/:times, **POST**

  - 1회당 병렬 API 요청수 조절

- /merge-transactions, **GET**

  - mergeTransaction 조회

- /batch/logs, **GET**
  - 배치 로그 조회
