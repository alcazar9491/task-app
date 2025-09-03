package memory

import (
	"errors"
	"sort"
	"sync"

	"go-tasks-api/internal/domain"
)

type TaskRepository struct {
	tasks  map[int]domain.Task
	nextID int
	mutex  *sync.Mutex
}

func NewTaskRepository() *TaskRepository {
	return &TaskRepository{
		tasks:  make(map[int]domain.Task),
		nextID: 1,
		mutex:  &sync.Mutex{},
	}
}

func (r *TaskRepository) GetAll(offset, limit int) ([]domain.Task, error) {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	taskList := make([]domain.Task, 0, len(r.tasks))
	for _, task := range r.tasks {
		taskList = append(taskList, task)
	}

	sort.Slice(taskList, func(i, j int) bool {
		return taskList[i].ID < taskList[j].ID
	})

	if offset >= len(taskList) {
		return []domain.Task{}, nil
	}

	end := offset + limit
	if end > len(taskList) {
		end = len(taskList)
	}

	return taskList[offset:end], nil
}

func (r *TaskRepository) Create(task *domain.Task) error {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	task.ID = r.nextID
	r.nextID++
	r.tasks[task.ID] = *task

	return nil
}

func (r *TaskRepository) GetByID(id int) (*domain.Task, error) {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	task, ok := r.tasks[id]
	if !ok {
		return nil, errors.New("task not found")
	}

	return &task, nil
}

func (r *TaskRepository) Update(task *domain.Task) error {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	if _, ok := r.tasks[task.ID]; !ok {
		return errors.New("task not found")
	}

	r.tasks[task.ID] = *task
	return nil
}
