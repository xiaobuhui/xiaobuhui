import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TICK = String.fromCharCode(96);

const PROFILE = "xiaobuhui";
const EMAIL = "kapibala555@163.com";
const ACCENT = "C1443C";
const INK = "2B2725";

const LANGS = [
  { code: "zh", file: "README.md", label: "简体中文", banner: "./assets/banner.jpg", footerImg: "./assets/footer.jpg" },
  { code: "en", file: "README.en.md", label: "English", banner: "./assets/banner.en.jpg", footerImg: "./assets/footer.en.jpg" },
  { code: "zhTW", file: "README.zh-TW.md", label: "繁體中文", banner: "./assets/banner.zh-TW.jpg", footerImg: "./assets/footer.zh-TW.jpg" },
  { code: "ja", file: "README.ja.md", label: "日本語", banner: "./assets/banner.en.jpg", footerImg: "./assets/footer.en.jpg" },
  { code: "ko", file: "README.ko.md", label: "한국어", banner: "./assets/banner.en.jpg", footerImg: "./assets/footer.en.jpg" },
  { code: "ru", file: "README.ru.md", label: "Русский", banner: "./assets/banner.en.jpg", footerImg: "./assets/footer.en.jpg" },
  { code: "es", file: "README.es.md", label: "Español", banner: "./assets/banner.en.jpg", footerImg: "./assets/footer.en.jpg" },
  { code: "fr", file: "README.fr.md", label: "Français", banner: "./assets/banner.en.jpg", footerImg: "./assets/footer.en.jpg" },
  { code: "de", file: "README.de.md", label: "Deutsch", banner: "./assets/banner.en.jpg", footerImg: "./assets/footer.en.jpg" },
  { code: "pt", file: "README.pt.md", label: "Português", banner: "./assets/banner.en.jpg", footerImg: "./assets/footer.en.jpg" },
];

const T = {
  ai: ["Spring AI", "LangChain", "LangGraph", "LangSmith", "Python", "FastAPI"],
  backend: ["Java", "Spring Boot", "Spring Cloud", "MyBatis-Plus", "Dubbo"],
  middleware: ["Nacos", "Seata", "RocketMQ", "Redis", "Sentinel", "Elasticsearch"],
  db: ["MySQL", "Redis", "SQLite"],
  frontend: ["Vue 3", "Astro", "Svelte", "TypeScript", "Tailwind CSS"],
  devops: ["Linux", "Docker", "Nginx"],
};

const CONTENT = {
  zh: {
    subtitle: "在读学生 · 后端为主的全栈开发 · 主攻 Agent 方向",
    about: [
      "我是 xiaobuhui，在读学生，后端为主的全栈开发。白天上课，晚上写代码，手上几个项目基本都是这么攒出来的。",
      "后端是我最扎实的一块。从 SSM 起步，Spring Boot、Spring Cloud 一路做下来，注册中心、网关、分布式事务这些都在实际项目里落地过。",
      "现在的方向是 AI 应用与 Agent 开发，主要工具是 Spring AI、LangChain、LangGraph，配合 Python / FastAPI 做实现。",
      "全栈这块前后端都能独立落地。前端以 Vue 3 / Astro 为主，配合 TypeScript 和 Tailwind CSS，能从接口一直做到页面。",
    ],
    workHeading: "在做什么",
    work: [
      "目前把大部分时间投在 Agent 方向：一边补工具调用、RAG、评测这些基础，一边用 Python 把想法做成能跑的东西。",
      "手上比较完整的两个项目都是前后端分离、从零搭起来的。CloudShopping 是 Vue 3 + Spring Cloud Alibaba 的 B2C 电商平台，含 Nacos 服务治理、Dubbo 远程调用、Seata 分布式事务；LiangtianDigitalFarm 是 Spring Boot 3 的智慧农业平台，覆盖种植到销售全流程，接入了物联网环境监测与远程控制。",
      "另外自己搭了一个 Astro 博客，用来沉淀技术笔记。",
    ],
    stackHeading: "技术栈",
    cols: ["方向", "技术栈", "定位"],
    rows: [
      ["AI / Agent", "ai", "当前主攻方向"],
      ["后端", "backend", "核心能力，多个完整项目"],
      ["中间件", "middleware", "项目实战配置"],
      ["数据库", "db", "设计与使用"],
      ["前端", "frontend", "可独立完成前后端全链路"],
      ["运维", "devops", "容器化部署"],
    ],
    footer: "欢迎交流 Java 后端、微服务与 Agent 开发",
  },

  en: {
    subtitle: "Undergraduate student · Backend-focused full-stack developer · AI agents",
    about: [
      "I am an undergraduate student and a backend-focused full-stack developer. I write code outside of class hours, and most of the projects in this account were built that way.",
      "Backend is my strongest area. I started with SSM and have since worked through Spring Boot and Spring Cloud, applying service discovery, API gateways, and distributed transactions in real projects.",
      "My current focus is AI applications and agent development. My primary tools are Spring AI, LangChain, and LangGraph, with Python / FastAPI for implementation.",
      "On the full-stack side I can deliver frontend and backend independently. I work mainly with Vue 3 / Astro, together with TypeScript and Tailwind CSS, and can take a feature from API to interface.",
    ],
    workHeading: "What I'm doing",
    work: [
      "Most of my time currently goes into agent development: studying the fundamentals such as tool calling, RAG, and evaluation, while building working prototypes in Python.",
      "Two of my more complete projects were built from scratch with a separated frontend and backend. CloudShopping is a B2C e-commerce platform on Vue 3 and Spring Cloud Alibaba, covering Nacos service discovery, Dubbo remote invocation, and Seata distributed transactions. LiangtianDigitalFarm is a smart agriculture platform on Spring Boot 3, covering the full planting-to-sales workflow with IoT-based environmental monitoring and remote control.",
      "I also maintain a personal Astro blog for technical notes.",
    ],
    stackHeading: "Tech stack",
    cols: ["Area", "Stack", "Focus"],
    rows: [
      ["AI / Agent", "ai", "Primary focus"],
      ["Backend", "backend", "Core strength, multiple complete projects"],
      ["Middleware", "middleware", "Hands-on configuration in real projects"],
      ["Database", "db", "Design and usage"],
      ["Frontend", "frontend", "Independent frontend-to-backend delivery"],
      ["DevOps", "devops", "Containerized deployment"],
    ],
    footer: "Open to conversations about Java backend, microservices, and agent development.",
  },

  zhTW: {
    subtitle: "在讀學生 · 後端為主的前後端開發 · 主攻 Agent 方向",
    about: [
      "我是 xiaobuhui，在讀學生，後端為主的前後端開發。白天上課，晚上寫程式，手上幾個專案基本都是這樣累積出來的。",
      "後端是我最扎實的一塊。從 SSM 起步，Spring Boot、Spring Cloud 一路做下來，註冊中心、閘道、分散式交易這些都在實際專案裡落地過。",
      "現在的方向是 AI 應用與 Agent 開發，主要工具是 Spring AI、LangChain、LangGraph，搭配 Python / FastAPI 實作。",
      "前後端這塊我都能獨立落地。前端以 Vue 3 / Astro 為主，搭配 TypeScript 和 Tailwind CSS，能從 API 一路做到頁面。",
    ],
    workHeading: "在做什麼",
    work: [
      "目前把大部分時間投在 Agent 方向：一邊補工具呼叫、RAG、評估這些基礎，一邊用 Python 把想法做成能跑的東西。",
      "手上比較完整的兩個專案都是前後端分離、從零搭起來的。CloudShopping 是 Vue 3 + Spring Cloud Alibaba 的 B2C 電商平台，含 Nacos 服務治理、Dubbo 遠端呼叫、Seata 分散式交易；LiangtianDigitalFarm 是 Spring Boot 3 的智慧農業平台，涵蓋種植到銷售全流程，接入了物聯網環境監測與遠端控制。",
      "另外自己架了一個 Astro 部落格，用來沉澱技術筆記。",
    ],
    stackHeading: "技術棧",
    cols: ["方向", "技術棧", "定位"],
    rows: [
      ["AI / Agent", "ai", "當前主攻方向"],
      ["後端", "backend", "核心能力，多個完整專案"],
      ["中介軟體", "middleware", "專案實戰配置"],
      ["資料庫", "db", "設計與使用"],
      ["前端", "frontend", "可獨立完成前後端全鏈路"],
      ["維運", "devops", "容器化部署"],
    ],
    footer: "歡迎交流 Java 後端、微服務與 Agent 開發",
  },

  ja: {
    subtitle: "大学生 · バックエンド中心のフロントエンド／バックエンド開発 · AI エージェントが主軸",
    about: [
      "xiaobuhui です。大学生で、バックエンドを中心にフロントエンドとバックエンドの両方を開発しています。授業の合間にコードを書き、このアカウントのプロジェクトはほとんどそうやって作ったものです。",
      "一番得意なのはバックエンドです。SSM から始めて Spring Boot、Spring Cloud と進み、サービスディスカバリ、API ゲートウェイ、分散トランザクションは実際のプロジェクトで使ってきました。",
      "現在の主軸は AI アプリケーションとエージェント開発です。Spring AI、LangChain、LangGraph を主なツールとして、Python / FastAPI で実装しています。",
      "フロントエンドとバックエンドを一人で担当できます。フロントは Vue 3 / Astro が中心で、TypeScript と Tailwind CSS を組み合わせ、API から画面まで通して作れます。",
    ],
    workHeading: "やっていること",
    work: [
      "今は時間の大半をエージェント開発に投じています。ツール呼び出し、RAG、評価といった基礎を学びながら、Python で動くものを作っています。",
      "比較的完成度の高いプロジェクトが二つあり、どちらもフロントとバックエンドを分離してゼロから構築しました。CloudShopping は Vue 3 + Spring Cloud Alibaba の B2C EC プラットフォームで、Nacos によるサービス管理、Dubbo のリモート呼び出し、Seata の分散トランザクションを含みます。LiangtianDigitalFarm は Spring Boot 3 のスマート農業プラットフォームで、栽培から販売までの工程をカバーし、IoT による環境モニタリングと遠隔制御を備えています。",
      "ほかに Astro で個人ブログを運営し、技術メモをまとめています。",
    ],
    stackHeading: "技術スタック",
    cols: ["分野", "技術スタック", "位置づけ"],
    rows: [
      ["AI / Agent", "ai", "現在の主軸"],
      ["バックエンド", "backend", "中核スキル、複数の完成プロジェクト"],
      ["ミドルウェア", "middleware", "実プロジェクトでの設定運用"],
      ["データベース", "db", "設計と運用"],
      ["フロントエンド", "frontend", "フロントからバックまでの一貫開発"],
      ["運用", "devops", "コンテナ運用"],
    ],
    footer: "Java バックエンド、マイクロサービス、エージェント開発についてのご相談は歓迎です",
  },

  ko: {
    subtitle: "재학생 · 백엔드 중심 풀스택 개발 · AI 에이전트 주력",
    about: [
      "xiaobuhui입니다. 재학생이며 백엔드 중심의 풀스택 개발자입니다. 수업 외 시간에 코드를 쓰고, 이 계정의 프로젝트는 대부분 그렇게 만들어졌습니다.",
      "가장 자신 있는 영역은 백엔드입니다. SSM으로 시작해 Spring Boot, Spring Cloud까지 진행했고, 서비스 디스커버리와 API 게이트웨이, 분산 트랜잭션은 실제 프로젝트에서 적용해 봤습니다.",
      "현재 주력은 AI 애플리케이션과 에이전트 개발입니다. Spring AI, LangChain, LangGraph를 주요 도구로 쓰고 Python / FastAPI로 구현합니다.",
      "풀스택으로서 프론트엔드와 백엔드를 모두 단독으로 처리할 수 있습니다. 프론트엔드는 Vue 3 / Astro 중심이며 TypeScript와 Tailwind CSS를 함께 사용해 API부터 화면까지 구현합니다.",
    ],
    workHeading: "하는 일",
    work: [
      "현재 대부분의 시간을 에이전트 개발에 쏟고 있습니다. 툴 호출, RAG, 평가 같은 기초를 공부하면서 Python으로 동작하는 프로토타입을 만듭니다.",
      "완성도가 비교적 높은 프로젝트 두 개는 모두 프론트엔드와 백엔드를 분리해 처음부터 구축했습니다. CloudShopping은 Vue 3 + Spring Cloud Alibaba 기반 B2C 커머스 플랫폼으로 Nacos 서비스 관리, Dubbo 원격 호출, Seata 분산 트랜잭션을 포함합니다. LiangtianDigitalFarm은 Spring Boot 3 기반 스마트 농업 플랫폼으로 재배부터 판매까지 전 과정을 다루며 IoT 환경 모니터링과 원격 제어를 지원합니다.",
      "그 외에 Astro로 개인 블로그를 운영하며 기술 노트를 정리하고 있습니다.",
    ],
    stackHeading: "기술 스택",
    cols: ["분야", "기술 스택", "비중"],
    rows: [
      ["AI / Agent", "ai", "현재 주력 분야"],
      ["백엔드", "backend", "핵심 역량, 다수의 완성 프로젝트"],
      ["미들웨어", "middleware", "실프로젝트 설정 경험"],
      ["데이터베이스", "db", "설계 및 운영"],
      ["프론트엔드", "frontend", "프론트와 백엔드 단독 개발"],
      ["운영", "devops", "컨테이너 배포"],
    ],
    footer: "Java 백엔드, 마이크로서비스, 에이전트 개발 관련 논의를 환영합니다",
  },

  ru: {
    subtitle: "Студент · Full-stack разработчик с фокусом на бэкенд · AI-агенты",
    about: [
      "Я xiaobuhui, студент и full-stack разработчик с фокусом на бэкенд. Пишу код вне учёбы, и большинство проектов здесь сделаны именно так.",
      "Сильнейшая область для меня это бэкенд. Начинал с SSM, затем прошёл Spring Boot и Spring Cloud: service discovery, API-шлюзы и распределённые транзакции применял в реальных проектах.",
      "Сейчас основной фокус это AI-приложения и разработка агентов. Основные инструменты: Spring AI, LangChain и LangGraph, реализация на Python / FastAPI.",
      "Как full-stack разработчик я самостоятельно закрываю и фронтенд, и бэкенд. Основной стек фронтенда это Vue 3 / Astro вместе с TypeScript и Tailwind CSS: могу довести задачу от API до интерфейса.",
    ],
    workHeading: "Чем занимаюсь",
    work: [
      "Сейчас большую часть времени занимает разработка агентов: изучаю базовые темы, такие как вызов инструментов, RAG и оценка качества, и делаю рабочие прототипы на Python.",
      "Два наиболее завершённых проекта построены с нуля с разделёнными фронтендом и бэкендом. CloudShopping это B2C-платформа электронной коммерции на Vue 3 и Spring Cloud Alibaba, включая service discovery на Nacos, удалённые вызовы через Dubbo и распределённые транзакции Seata. LiangtianDigitalFarm это платформа умного сельского хозяйства на Spring Boot 3, охватывающая весь цикл от выращивания до продажи, с IoT-мониторингом среды и удалённым управлением.",
      "Кроме того, веду личный блог на Astro для технических заметок.",
    ],
    stackHeading: "Технологии",
    cols: ["Направление", "Стек", "Роль"],
    rows: [
      ["AI / Agent", "ai", "Основной фокус"],
      ["Бэкенд", "backend", "Ключевая компетенция, несколько завершённых проектов"],
      ["Middleware", "middleware", "Настройка в реальных проектах"],
      ["Базы данных", "db", "Проектирование и использование"],
      ["Фронтенд", "frontend", "Самостоятельная разработка фронтенда и бэкенда"],
      ["DevOps", "devops", "Контейнерное развёртывание"],
    ],
    footer: "Открыт к обсуждению Java-бэкенда, микросервисов и разработки агентов",
  },

  es: {
    subtitle: "Estudiante · Desarrollador full-stack con enfoque en backend · Agentes de IA",
    about: [
      "Soy xiaobuhui, estudiante y desarrollador full-stack con enfoque en backend. Escribo código fuera del horario de clases, y la mayoría de los proyectos de esta cuenta se hicieron así.",
      "El backend es mi área más sólida. Empecé con SSM y después trabajé con Spring Boot y Spring Cloud, aplicando descubrimiento de servicios, pasarelas de API y transacciones distribuidas en proyectos reales.",
      "Mi enfoque actual son las aplicaciones de IA y el desarrollo de agentes. Mis herramientas principales son Spring AI, LangChain y LangGraph, con Python / FastAPI para la implementación.",
      "Como desarrollador full-stack puedo entregar frontend y backend de forma independiente. Trabajo principalmente con Vue 3 / Astro, junto con TypeScript y Tailwind CSS, y puedo llevar una función desde la API hasta la interfaz.",
    ],
    workHeading: "Qué hago",
    work: [
      "Actualmente dedico la mayor parte del tiempo al desarrollo de agentes: estudio los fundamentos como llamada de herramientas, RAG y evaluación, mientras construyo prototipos funcionales en Python.",
      "Mis dos proyectos más completos se construyeron desde cero con frontend y backend separados. CloudShopping es una plataforma de comercio electrónico B2C sobre Vue 3 y Spring Cloud Alibaba, con descubrimiento de servicios Nacos, invocación remota Dubbo y transacciones distribuidas Seata. LiangtianDigitalFarm es una plataforma de agricultura inteligente sobre Spring Boot 3 que cubre todo el proceso de cultivo a venta, con monitorización ambiental IoT y control remoto.",
      "También mantengo un blog personal en Astro para notas técnicas.",
    ],
    stackHeading: "Tecnologías",
    cols: ["Área", "Tecnologías", "Enfoque"],
    rows: [
      ["AI / Agent", "ai", "Enfoque principal"],
      ["Backend", "backend", "Competencia central, varios proyectos completos"],
      ["Middleware", "middleware", "Configuración en proyectos reales"],
      ["Bases de datos", "db", "Diseño y uso"],
      ["Frontend", "frontend", "Entrega independiente de frontend y backend"],
      ["DevOps", "devops", "Despliegue en contenedores"],
    ],
    footer: "Abierto a conversar sobre backend Java, microservicios y desarrollo de agentes",
  },

  fr: {
    subtitle: "Étudiant · Développeur full-stack orienté backend · Agents IA",
    about: [
      "Je suis xiaobuhui, étudiant et développeur full-stack orienté backend. J'écris du code en dehors des cours, et la plupart des projets de ce compte ont été réalisés ainsi.",
      "Le backend est mon domaine le plus solide. J'ai commencé avec SSM, puis travaillé avec Spring Boot et Spring Cloud : découverte de services, passerelles API et transactions distribuées, appliqués dans de vrais projets.",
      "Mon axe actuel est celui des applications d'IA et du développement d'agents. Mes principaux outils sont Spring AI, LangChain et LangGraph, avec Python / FastAPI pour l'implémentation.",
      "En tant que développeur full-stack, je livre le frontend et le backend de manière autonome. Je travaille principalement avec Vue 3 / Astro, avec TypeScript et Tailwind CSS, et je peux mener une fonctionnalité de l'API jusqu'à l'interface.",
    ],
    workHeading: "Ce que je fais",
    work: [
      "Je consacre actuellement l'essentiel de mon temps au développement d'agents : j'étudie les fondamentaux comme l'appel d'outils, le RAG et l'évaluation, tout en construisant des prototypes fonctionnels en Python.",
      "Mes deux projets les plus aboutis ont été construits de zéro avec un frontend et un backend séparés. CloudShopping est une plateforme e-commerce B2C sur Vue 3 et Spring Cloud Alibaba, avec découverte de services Nacos, appels distants Dubbo et transactions distribuées Seata. LiangtianDigitalFarm est une plateforme d'agriculture intelligente sur Spring Boot 3 couvrant tout le cycle de la culture à la vente, avec surveillance environnementale IoT et contrôle à distance.",
      "Je tiens également un blog personnel sous Astro pour mes notes techniques.",
    ],
    stackHeading: "Technologies",
    cols: ["Domaine", "Technologies", "Positionnement"],
    rows: [
      ["AI / Agent", "ai", "Axe principal"],
      ["Backend", "backend", "Compétence clé, plusieurs projets complets"],
      ["Middleware", "middleware", "Configuration en projet réel"],
      ["Bases de données", "db", "Conception et utilisation"],
      ["Frontend", "frontend", "Livraison autonome frontend et backend"],
      ["DevOps", "devops", "Déploiement conteneurisé"],
    ],
    footer: "Ouvert aux échanges sur le backend Java, les microservices et le développement d'agents",
  },

  de: {
    subtitle: "Student · Backend-orientierter Full-Stack-Entwickler · KI-Agenten",
    about: [
      "Ich bin xiaobuhui, Student und backend-orientierter Full-Stack-Entwickler. Ich schreibe Code außerhalb der Vorlesungen, und die meisten Projekte in diesem Account sind so entstanden.",
      "Backend ist mein stärkstes Feld. Ich habe mit SSM begonnen und mich über Spring Boot und Spring Cloud weiterentwickelt: Service Discovery, API-Gateways und verteilte Transaktionen habe ich in echten Projekten eingesetzt.",
      "Mein aktueller Schwerpunkt sind KI-Anwendungen und Agent-Entwicklung. Meine wichtigsten Werkzeuge sind Spring AI, LangChain und LangGraph, umgesetzt mit Python / FastAPI.",
      "Als Full-Stack-Entwickler setze ich Frontend und Backend eigenständig um. Ich arbeite vor allem mit Vue 3 / Astro zusammen mit TypeScript und Tailwind CSS und bringe ein Feature von der API bis zur Oberfläche.",
    ],
    workHeading: "Was ich mache",
    work: [
      "Derzeit fließt der größte Teil meiner Zeit in die Agent-Entwicklung: Ich arbeite an den Grundlagen wie Tool-Aufrufen, RAG und Evaluation und baue lauffähige Prototypen in Python.",
      "Meine beiden vollständigsten Projekte wurden von Grund auf mit getrenntem Frontend und Backend gebaut. CloudShopping ist eine B2C-E-Commerce-Plattform auf Vue 3 und Spring Cloud Alibaba, inklusive Nacos Service Discovery, Dubbo-Aufrufen und Seata-Transaktionen. LiangtianDigitalFarm ist eine Smart-Agriculture-Plattform auf Spring Boot 3, die den gesamten Prozess vom Anbau bis zum Verkauf abdeckt, mit IoT-Umgebungsmonitoring und Fernsteuerung.",
      "Außerdem betreibe ich einen persönlichen Astro-Blog für technische Notizen.",
    ],
    stackHeading: "Technologien",
    cols: ["Bereich", "Technologien", "Schwerpunkt"],
    rows: [
      ["AI / Agent", "ai", "Aktueller Schwerpunkt"],
      ["Backend", "backend", "Kernkompetenz, mehrere vollständige Projekte"],
      ["Middleware", "middleware", "Konfiguration in realen Projekten"],
      ["Datenbanken", "db", "Design und Nutzung"],
      ["Frontend", "frontend", "Eigenständige Umsetzung von Frontend und Backend"],
      ["DevOps", "devops", "Containerisiertes Deployment"],
    ],
    footer: "Offen für Austausch über Java-Backend, Microservices und Agent-Entwicklung",
  },

  pt: {
    subtitle: "Estudante · Desenvolvedor full-stack com foco em backend · Agentes de IA",
    about: [
      "Sou xiaobuhui, estudante e desenvolvedor full-stack com foco em backend. Escrevo código fora do horário de aula, e a maioria dos projetos desta conta foi feita assim.",
      "Backend é minha área mais sólida. Comecei com SSM e depois avancei para Spring Boot e Spring Cloud, aplicando service discovery, gateways de API e transações distribuídas em projetos reais.",
      "Meu foco atual são aplicações de IA e desenvolvimento de agentes. Minhas principais ferramentas são Spring AI, LangChain e LangGraph, com Python / FastAPI na implementação.",
      "Como desenvolvedor full-stack, entrego frontend e backend de forma independente. Trabalho principalmente com Vue 3 / Astro, junto com TypeScript e Tailwind CSS, e consigo levar uma funcionalidade da API até a interface.",
    ],
    workHeading: "O que eu faço",
    work: [
      "Atualmente dedico a maior parte do tempo ao desenvolvimento de agentes: estudo os fundamentos como chamada de ferramentas, RAG e avaliação, enquanto construo protótipos funcionais em Python.",
      "Meus dois projetos mais completos foram construídos do zero com frontend e backend separados. CloudShopping é uma plataforma de e-commerce B2C em Vue 3 e Spring Cloud Alibaba, com service discovery via Nacos, chamadas remotas Dubbo e transações distribuídas Seata. LiangtianDigitalFarm é uma plataforma de agricultura inteligente em Spring Boot 3, cobrindo todo o ciclo do cultivo à venda, com monitoramento ambiental via IoT e controle remoto.",
      "Também mantenho um blog pessoal em Astro para notas técnicas.",
    ],
    stackHeading: "Tecnologias",
    cols: ["Área", "Tecnologias", "Foco"],
    rows: [
      ["AI / Agent", "ai", "Foco principal"],
      ["Backend", "backend", "Competência central, vários projetos completos"],
      ["Middleware", "middleware", "Configuração em projetos reais"],
      ["Bancos de dados", "db", "Design e uso"],
      ["Frontend", "frontend", "Entrega independente de frontend e backend"],
      ["DevOps", "devops", "Deploy em contêineres"],
    ],
    footer: "Aberto a conversas sobre backend Java, microsserviços e desenvolvimento de agentes",
  },
};

function detectEol(file) {
  if (!existsSync(file)) return "\n";
  const raw = readFileSync(file, "utf8");
  return raw.includes("\r\n") ? "\r\n" : "\n";
}

function build(lang) {
  const c = CONTENT[lang.code];
  const switcher = LANGS.map((l) =>
    l.file === lang.file ? `<b>${l.label}</b>` : `<a href="./${l.file}">${l.label}</a>`
  ).join(" · ");

  const rows = c.rows
    .map((r) => `| ${r[0]} | ${T[r[1]].map((t) => TICK + t + TICK).join(" ")} | ${r[2]} |`)
    .join("\n");

  return `<img width="880" src="${lang.banner}" alt="Hi, I'm ${PROFILE} · ${c.subtitle}" />

<p align="right">
  ${switcher}
</p>

<p>
  <a href="https://github.com/${PROFILE}"><img src="https://img.shields.io/badge/GitHub-${PROFILE}-${ACCENT}?style=flat-square&logo=github&logoColor=white&labelColor=${INK}" alt="GitHub" /></a>
  <a href="mailto:${EMAIL}"><img src="https://img.shields.io/badge/Email-${EMAIL.replace("@", "%40")}-${ACCENT}?style=flat-square&logo=gmail&logoColor=white&labelColor=${INK}" alt="Email" /></a>
</p>

${c.about.join("\n\n")}

---

## ${c.workHeading}

${c.work.join("\n\n")}

---

## ${c.stackHeading}

| ${c.cols[0]} | ${c.cols[1]} | ${c.cols[2]} |
| --- | --- | --- |
${rows}

---

<img width="880" src="${lang.footerImg}" alt="${c.footer}" />
`;
}

const eol = detectEol(join(ROOT, "README.md"));
let n = 0;
for (const lang of LANGS) {
  const body = build(lang).replace(/\n/g, eol);
  writeFileSync(join(ROOT, lang.file), body, "utf8");
  n++;
}
console.log(`已生成 ${n} 个语言文件，换行符: ${eol === "\r\n" ? "CRLF" : "LF"}`);
for (const lang of LANGS) console.log(`  ${lang.file.padEnd(20)} ${lang.label}`);
