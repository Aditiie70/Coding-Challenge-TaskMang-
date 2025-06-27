package com.example.taskManager;

import com.example.taskManager.entity.Task;
import com.example.taskManager.entity.Task.Priority;
import com.example.taskManager.entity.Task.Status;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.hasItem;

@SpringBootTest
@AutoConfigureMockMvc
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testAddAndGetTask() throws Exception {
       
        Task task = new Task();
        task.setTitle("Simple Task");
        task.setDescription("Testexample");
        task.setDueDate(LocalDate.of(2025, 7, 15));
        task.setPriority(Priority.LOW);
        task.setStatus(Status.PENDING);

        
        mockMvc.perform(
                post("/task")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(task))
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value("Simple Task"));

        
        mockMvc.perform(get("/task"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].title", hasItem("Simple Task")));
    }
}
