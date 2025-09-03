package service

import "go-tasks-api/internal/domain"

// TaskRepository is the interface for the task repository.
type TaskRepository interface {
	GetAll(offset, limit int) ([]domain.Task, error)
	Create(*domain.Task) error
	GetByID(id int) (*domain.Task, error)
	Update(task *domain.Task) error
}

// TaskService is the service for tasks.
type TaskService struct {
	repo TaskRepository
}

// NewTaskService creates a new task service.
func NewTaskService(repo TaskRepository) *TaskService {
	return &TaskService{repo: repo}
}

// GetAll returns all tasks.
func (s *TaskService) GetAll(offset, limit int) ([]domain.Task, error) {
	return s.repo.GetAll(offset, limit)
}

// Create creates a new task.
func (s *TaskService) Create(task *domain.Task) error {
	return s.repo.Create(task)
}

// MarkAsDone marks a task as done.
func (s *TaskService) MarkAsDone(id int) error {
	task, err := s.repo.GetByID(id)
	if err != nil {
		return err
	}

	task.Done = true
	return s.repo.Update(task)
}
