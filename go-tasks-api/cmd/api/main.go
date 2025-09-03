package main

import (
	"log"
	"net/http"

	taskhandler "go-tasks-api/internal/handler/http"
	"go-tasks-api/internal/repository/memory"
	"go-tasks-api/internal/service"
)

func main() {
	taskRepo := memory.NewTaskRepository()
	taskService := service.NewTaskService(taskRepo)
	taskHandler := taskhandler.NewTaskHandler(taskService)

	// Create a new ServeMux
	mux := http.NewServeMux()
	mux.HandleFunc("/tasks", taskHandler.TasksHandler)
	mux.HandleFunc("/tasks/", taskHandler.TaskHandler)

	log.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", corsMiddleware(mux)); err != nil {
		log.Fatal(err)
	}
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
