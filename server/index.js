const express = require("express");
const app = express();
const PORT = 5100;
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://127.0.0.1:3000",
  },
});
const multer = require("multer");
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.json());

let chatHistory = [];
let userSubscriptions = {};

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const subscriptionsDir = path.join(__dirname, "subscriptions");
if (!fs.existsSync(subscriptionsDir)) {
  try {
    fs.mkdirSync(subscriptionsDir, { recursive: true });
    console.log(
      "Создана директория для сохранения подписок:",
      subscriptionsDir
    );
  } catch (err) {
    console.error("Ошибка при создании директории для подписок:", err);
  }
} else {
  console.log(
    "Директория для сохранения подписок уже существует:",
    subscriptionsDir
  );
}

// Загрузка подписок из директории subscriptions при старте сервера
function loadSubscriptions() {
  fs.readdir(subscriptionsDir, (err, files) => {
    if (err) {
      console.error("Ошибка при чтении директории подписок:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(subscriptionsDir, file);
      const fileData = fs.readFileSync(filePath, "utf-8");
      try {
        const subscriptionData = JSON.parse(fileData);
        userSubscriptions[subscriptionData.email] = subscriptionData;
        console.log(
          `Загружена подписка для пользователя: ${subscriptionData.email}`
        );
      } catch (parseError) {
        console.error(
          `Ошибка при парсинге файла подписки ${file}:`,
          parseError
        );
      }
    });

    console.log("Подписки загружены:", userSubscriptions);
  });
}

// Загрузка подписок при старте сервера
loadSubscriptions();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/api/chat", (req, res) => {
  res.json({
    chats: chatHistory,
  });
});

app.post("/api/chat", (req, res) => {
  const { message, sender } = req.body;
  const newChat = {
    id: chatHistory.length + 1,
    sender,
    message,
  };
  chatHistory.push(newChat);

  socketIO.emit("newMessage", newChat);

  res.json({
    chat: newChat,
  });
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const sender = req.body.sender;

  if (!file) {
    return res.status(400).send("Файл не был загружен.");
  }

  const newChat = {
    id: chatHistory.length + 1,
    sender,
    message: file.filename,
    type: "file",
  };
  chatHistory.push(newChat);

  socketIO.emit("newMessage", newChat);

  res.json({
    сообщение: "Файл успешно загружен",
    chat: newChat,
  });
});

app.post("/api/subscriptions", (req, res) => {
  console.log("Получена запрос на сохранение подписи:", req.body);

  const { email, token, id, subscription, status, error } = req.body;

  if (!email || !token || !id || !subscription || !status) {
    return res.status(400).send("Отсутствуют обязательные поля.");
  }

  const userData = {
    email,
    token,
    subscription,
    status,
    error,
  };

  // Сохранение подписки в памяти
  userSubscriptions[email] = userData;

  // Сохранение подписки в файл
  const fileName = `${email}.json`;
  const filePath = path.join(subscriptionsDir, fileName);

  fs.writeFile(filePath, JSON.stringify(userData, null, 2), (err) => {
    if (err) {
      console.error("Ошибка при записи файла:", err);
      console.error("Путь к файлу:", filePath);
      console.error("Содержимое данных для файла:", userData);
      return res
        .status(500)
        .send(
          "Произошла ошибка при записи файла. Пожалуйста, обратитесь в поддержку."
        );
    }

    console.log(`Данные подписки успешно сохранены для пользователя: ${email}`);
    res.json({
      message: "Данные подписки успешно сохранены",
      subscription: userData,
    });
  });
});

app.get("/api/users/:email", (req, res) => {
  const email = req.params.email;
  const fileName = `${email}.json`; // Имя файла, соответствующее email пользователя
  const filePath = path.join(subscriptionsDir, fileName); // Полный путь к файлу

  // Проверяем, существует ли файл
  if (fs.existsSync(filePath)) {
    try {
      // Читаем данные из файла
      const fileData = fs.readFileSync(filePath, "utf-8");
      const userData = JSON.parse(fileData);

      console.log(`Получение данных о подписке пользователя с email: ${email}`);
      res.json(userData); // Возвращаем данные пользователя
    } catch (err) {
      console.error(`Ошибка при чтении файла для email: ${email}`, err);
      res.status(500).json({ ошибка: "Ошибка при чтении данных пользователя" });
    }
  } else {
    console.error(`Пользователь не найден для email: ${email}`);
    res.status(404).json({ ошибка: "Пользователь не найден" });
  }
});

app.use("/uploads", express.static(uploadDir));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} пользователь подключился`);

  socket.on("disconnect", () => {
    console.log(`${socket.id} пользователь отключился`);
  });
});

http.listen(PORT, () => {
  console.log("Сервер запущен на порту " + PORT);
});
