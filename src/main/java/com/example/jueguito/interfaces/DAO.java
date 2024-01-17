package com.example.jueguito.interfaces;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;

public interface DAO <T , PK extends Serializable >{
    List<T> getAll() throws SQLException;
    T getById(PK id) throws SQLException;
    PK insert(T t) throws SQLException;
    int update(T t) throws SQLException;
    int delete(T t) throws SQLException;
}
