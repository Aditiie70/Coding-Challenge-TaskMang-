package com.example.taskManager.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.taskManager.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
