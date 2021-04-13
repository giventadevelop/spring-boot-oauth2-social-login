package com.javachinna.service;

import com.javachinna.mapper.UserMapper;
import com.javachinna.model.Role;
import com.javachinna.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javachinna.dto.LocalUser;
import com.javachinna.exception.ResourceNotFoundException;
import com.javachinna.util.GeneralUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 
 * @author Chinna
 *
 */
@Service("localUserDetailService")
public class LocalUserDetailService implements UserDetailsService {



	@Autowired
	private UserService userService;



	@Override
	@Transactional
	public LocalUser loadUserByUsername(final String email) throws UsernameNotFoundException {
		User user = userService.findUserByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException("User " + email + " was not found in the database");
		}
		return createLocalUser(user);
	}

	@Transactional
	public LocalUser loadUserById(Long id) {
		User user = userService.findUserById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
		return createLocalUser(user);
	}

	/**
	 * @param user
	 * @return
	 */
	private LocalUser createLocalUser(User user) {
		Set roles=new HashSet();
		roles.add(new Role(1L,"ROLE_USER"));
		user.getUserRoles();
		//return new LocalUser(user.getEmail(), user.getPassword(), user.getEnabled(), true, true, true, GeneralUtils.buildSimpleGrantedAuthorities(user.getRoles()), user);
		return new LocalUser(user.getEmail(), user.getPassword(), user.getEnabled(), true, true, true, GeneralUtils.buildSimpleGrantedAuthorities(roles), user);
	}
}
